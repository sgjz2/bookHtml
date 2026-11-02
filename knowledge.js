(function () {
  'use strict';
  const clamp = (v,a,b) => Math.min(b,Math.max(a,v));
  function viewFrame(width,height){
    // Reserve actual room above the upper star groups for their chapter names.
    const top=144,bottom=height-(width<650?190:145);
    return {cx:width/2,cy:(top+bottom)/2,sx:Math.max(160,width-(width<650?50:110))/1900,sy:Math.max(220,bottom-top)/1450};
  }
  function project(point,camera,width,height) {
    const p=point,perspective=1;
    const view=viewFrame(width,height),sx=view.sx*camera.zoom,sy=view.sy*camera.zoom;
    return {x:view.cx+camera.panX+p.x*sx*perspective,y:view.cy+camera.panY+p.y*sy*perspective,z:p.z,depth:clamp((p.z+650)/1300,.1,1),scale:Math.min(sx,sy)*perspective};
  }
  function zoomCamera(camera,factor,point,width,height) {
    const zoom=clamp(camera.zoom*factor,1,6), ratio=zoom/camera.zoom, {cx,cy}=viewFrame(width,height);
    return {...camera,zoom,panX:point.x-cx-(point.x-cx-camera.panX)*ratio,panY:point.y-cy-(point.y-cy-camera.panY)*ratio};
  }
  function smoothstep(a,b,value){const t=clamp((value-a)/(b-a),0,1);return t*t*(3-2*t);}
  // Spatial proximity follows the book's chapter/section structure, not inferred causality.
  function chapterLayout(data){
    const anchors=[[-650,-420],[-80,-465],[560,-345],[660,85],[65,35],[-610,70],[-560,500],[45,505],[660,500]];
    const groups=data.chapters.map((chapter,index)=>({...chapter,x:anchors[index][0],y:anchors[index][1],z:0,members:[],sections:[]}));
    const byChapter=new Map(groups.map(group=>[group.id,group])),positions=new Map();
    for(const node of data.nodes){const group=byChapter.get(node.chapter);if(!group)throw new Error('Missing primary-source chapter');group.members.push(node);}
    const sourceOrder=(a,b)=>a.endsWith('/index.md')!==b.endsWith('/index.md')?(a.endsWith('/index.md')?-1:1):a.localeCompare(b,undefined,{numeric:true});
    for(const group of groups){
      group.members.sort((a,b)=>sourceOrder(data.evidence[a.primary].source,data.evidence[b.primary].source)||data.evidence[a.primary].line-data.evidence[b.primary].line||data.evidence[a.primary].quote.indexOf(a.label)-data.evidence[b.primary].quote.indexOf(b.label)||a.id.localeCompare(b.id));
      const sections=new Map();
      for(const node of group.members){const proof=data.evidence[node.primary];if(!sections.has(proof.source))sections.set(proof.source,{id:proof.source,title:proof.title,members:[]});sections.get(proof.source).members.push(node);}
      group.sections=Array.from(sections.values());
      group.sections.forEach((section,index)=>{
        const angle=-2.5+index*4.9/Math.max(1,group.sections.length-1),density=Math.sqrt(group.members.length/26);
        section.x=group.sections.length===1?0:Math.cos(angle)*(115+45*density);
        section.y=group.sections.length===1?0:Math.sin(angle)*(70+30*density);
        section.members.forEach((node,order)=>{
          const theta=order*2.3999632297+index*.63,r=section.members.length===1?0:22*Math.sqrt(order+.5);
          const offset={x:section.x+Math.cos(theta)*r,y:section.y+Math.sin(theta)*r*.85,z:0};
          positions.set(node.id,{group,section,order,offset,target:{...offset}});
        });
      });
      // Relax collisions while tethering each point to its source section.
      // Only audited explicit edges can add a small local attraction.
      const edges=data.edges.filter(edge=>edge.kind==='explicit'&&byChapter.get(data.nodes.find(n=>n.id===edge.source).chapter)===group&&byChapter.get(data.nodes.find(n=>n.id===edge.target).chapter)===group);
      for(let step=0;step<160;step++){
        const forces=new Map(group.members.map(node=>[node.id,{x:0,y:0}]));
        for(let i=0;i<group.members.length;i++)for(let j=i+1;j<group.members.length;j++){
          const a=positions.get(group.members[i].id).offset,b=positions.get(group.members[j].id).offset,dx=b.x-a.x,dy=b.y-a.y,distance=Math.hypot(dx,dy)||.01;
          if(distance>=65)continue;const force=(65-distance)*.18,fx=dx/distance*force,fy=dy/distance*force;
          forces.get(group.members[i].id).x-=fx;forces.get(group.members[i].id).y-=fy;forces.get(group.members[j].id).x+=fx;forces.get(group.members[j].id).y+=fy;
        }
        for(const edge of edges){const a=positions.get(edge.source),b=positions.get(edge.target),dx=b.offset.x-a.offset.x,dy=b.offset.y-a.offset.y,distance=Math.hypot(dx,dy);if(distance<75)continue;const k=.002;forces.get(edge.source).x+=dx*k;forces.get(edge.source).y+=dy*k;forces.get(edge.target).x-=dx*k;forces.get(edge.target).y-=dy*k;}
        for(const node of group.members){const p=positions.get(node.id),f=forces.get(node.id);p.offset.x+=f.x+(p.target.x-p.offset.x)*.04;p.offset.y+=f.y+(p.target.y-p.offset.y)*.04;p.offset.x=clamp(p.offset.x,p.target.x-38,p.target.x+38);p.offset.y=clamp(p.offset.y,p.target.y-38,p.target.y+38);}
      }
      // A lower vertical spread leaves an open reading band above every group.
      // The enlarged collision distance above preserves distinct star cores.
      for(const node of group.members)positions.get(node.id).offset.y*=.75;
    }
    return {groups,positions};
  }
  function displayPosition(node,layout,zoom){const {group,offset}=layout.positions.get(node.id);return{x:group.x+offset.x,y:group.y+offset.y,z:0};}
  // A single opening cloud made only from the actual book entities. Its spiral
  // placement is decorative, not a new semantic grouping or relationship.
  function nebulaLayout(data){
    const seed=id=>{let h=2166136261;for(const c of id)h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0)/4294967295;};
    const nodes=data.nodes.slice().sort((a,b)=>seed(a.id)-seed(b.id));
    const points=nodes.map((node,i)=>{const r=Math.pow((i+.7)/nodes.length,.7),angle=r*6.7+(i%2)*Math.PI+(seed(node.id+'a')-.5)*1.2;return{id:node.id,x:Math.cos(angle)*r,y:Math.sin(angle)*r*.65,weight:seed(node.id+'w')};});
    for(let step=0;step<100;step++)for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
      const a=points[i],b=points[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy)||.001;if(d>=.065)continue;const f=(.065-d)*.12;const x=dx/d*f,y=dy/d*f;a.x+=x;a.y+=y;b.x-=x;b.y-=y;
    }
    return new Map(points.map(p=>{p.z=(seed(p.id+'z')-.5)*.2*(1-Math.min(1,Math.hypot(p.x,p.y))*.65);return[p.id,p];}));
  }
  function nebulaProject(point,width,height,arrival=1,rotation=0){
    const angle=rotation+(1-arrival)*-.28,scale=.88+.12*arrival;
    const x=point.x*Math.cos(angle)-(point.y/.65)*Math.sin(angle),y=point.x*Math.sin(angle)+(point.y/.65)*Math.cos(angle);
    const tilt=1.02,z=point.z||0,depth=y*Math.sin(tilt)+z*Math.cos(tilt),vertical=y*Math.cos(tilt)-z*Math.sin(tilt),perspective=1/(1-depth*.2),roll=-.24;
    const screenX=(x*Math.cos(roll)-vertical*Math.sin(roll))*perspective,screenY=(x*Math.sin(roll)+vertical*Math.cos(roll))*perspective;
    const unit=Math.min(width*.41,(height-185)*.86);
    return{x:width/2+screenX*unit*scale,y:(height-120)/2+screenY*unit*scale,z:depth,depth:clamp((depth+1)/2,0,1),scale:perspective};
  }
  function pointAppearance({guide,depth,detailAlpha,active,hot,neighbor,selected,visible,spacing=Infinity}){
    const opacity=!visible?0:active||hot?.98:selected&&neighbor?.78:selected?.36:guide?.65+depth*.15:.43+detailAlpha*.22;
    const desired=active?8:hot?7:selected&&neighbor?4.4:guide?4.6+depth*1.2:2.6+detailAlpha*.8;
    return {opacity,radius:Math.min(desired,spacing*.44)};
  }
  function guideStars(data,layout){
    const degrees=new Map(data.nodes.map(node=>[node.id,0]));
    for(const edge of data.edges.filter(e=>e.kind==='explicit')){degrees.set(edge.source,degrees.get(edge.source)+1);degrees.set(edge.target,degrees.get(edge.target)+1);}
    const guides=new Set();
    for(const group of layout.groups){
      const ranked=group.members.slice().sort((a,b)=>degrees.get(b.id)-degrees.get(a.id));
      ranked.filter(n=>degrees.get(n.id)>0).slice(0,7).forEach(n=>guides.add(n.id));
      for(const fraction of [0,1,.33,.66,.5]){if(group.members.filter(n=>guides.has(n.id)).length>=7)break;const n=group.members[Math.round(fraction*(group.members.length-1))];if(n)guides.add(n.id);}
    }
    return guides;
  }
  function sceneEdges(data,visibleIds,guides,detailAlpha,showExplicit,showCo,selected,only){
    const byId=new Map(data.nodes.map(node=>[node.id,node]));
    const eligible=data.edges.filter(edge=>{
      if(edge.kind==='explicit'?!showExplicit:!showCo)return false;
      if(!visibleIds.has(edge.source)||!visibleIds.has(edge.target))return false;
      if(only&&selected&&edge.source!==selected&&edge.target!==selected)return false;
      return !!(selected&&(edge.source===selected||edge.target===selected))||detailAlpha>.01||(edge.kind==='explicit'&&guides.has(edge.source)&&guides.has(edge.target));
    });
    if(selected){
      const adjacent=eligible.filter(edge=>edge.source===selected||edge.target===selected);
      const explicit=adjacent.filter(edge=>edge.kind==='explicit').sort((a,b)=>Number(b.crossChapter)-Number(a.crossChapter));
      const cross=explicit.filter(edge=>edge.crossChapter),local=explicit.filter(edge=>!edge.crossChapter),balanced=[];
      for(let i=0;i<Math.max(cross.length,local.length);i++){if(cross[i])balanced.push(cross[i]);if(local[i])balanced.push(local[i]);}
      return balanced.slice(0,10).concat(adjacent.filter(edge=>edge.kind==='cooccurrence').slice(0,showCo?6:0),only?[]:eligible.filter(edge=>edge.kind==='explicit'&&edge.source!==selected&&edge.target!==selected).slice(0,8));
    }
    // One local relation per chapter before adding a second: no chapter can
    // monopolize the overview simply because its assertions occur first.
    const local=eligible.filter(edge=>edge.kind==='explicit'&&byId.get(edge.source).chapter===byId.get(edge.target).chapter);
    const overview=[],counts=new Map();
    for(const quota of [1,2,3])for(const edge of local){const id=byId.get(edge.source).chapter;if((counts.get(id)||0)>=quota||overview.includes(edge))continue;overview.push(edge);counts.set(id,(counts.get(id)||0)+1);}
    return overview.slice(0,only||detailAlpha<.01?8:24);
  }
  function createModel(data) {
    const byId=new Map(data.nodes.map(n=>[n.id,n])), adjacency=new Map(data.nodes.map(n=>[n.id,[]]));
    data.edges.forEach(edge=>{
      if(!byId.has(edge.source)||!byId.has(edge.target)||!edge.evidence.length)throw new Error('Invalid evidence relation');
      for(const id of edge.evidence)if(!data.evidence[id])throw new Error('Missing paragraph');
      adjacency.get(edge.source).push({node:byId.get(edge.target),edge}); adjacency.get(edge.target).push({node:byId.get(edge.source),edge});
    });
    return {byId,adjacency,
      search(query='',chapter='',types=null){const term=query.trim().toLocaleLowerCase();const score=n=>n.label.toLocaleLowerCase()===term?10:n.aliases.some(alias=>alias.toLocaleLowerCase()===term)?9:n.label.toLocaleLowerCase().includes(term)?6:n.aliases.some(alias=>alias.toLocaleLowerCase().includes(term))?4:1;return data.nodes.filter(n=>(!chapter||n.chapters.includes(chapter))&&(!types||types.has(n.type))&&(!term||(n.label+' '+n.aliases.join(' ')+' '+n.note).toLocaleLowerCase().includes(term))).sort((a,b)=>term?score(b)-score(a):0);},
      related(id,includeCo=false){return (adjacency.get(id)||[]).filter(item=>includeCo||item.edge.kind==='explicit').slice().sort((a,b)=>Number(a.edge.kind==='cooccurrence')-Number(b.edge.kind==='cooccurrence')||Number(b.edge.crossChapter)-Number(a.edge.crossChapter)||b.edge.evidence.length-a.edge.evidence.length);}
    };
  }
  function overlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
  const core={clamp,viewFrame,project,zoomCamera,createModel,overlap,smoothstep,chapterLayout,displayPosition,pointAppearance,guideStars,sceneEdges,nebulaLayout,nebulaProject};
  if(typeof module!=='undefined'&&module.exports)module.exports=core;
  if(typeof document==='undefined')return;
  const data=window.DESIGNBOOK_KNOWLEDGE;
  if(!data||data.version!==2)return;
  const model=createModel(data), $=id=>document.getElementById(id);
  const layout=chapterLayout(data);
  const cloud=nebulaLayout(data);
  const guides=guideStars(data,layout);
  const canvas=$('knowledge-canvas'),stage=$('map-stage'),ctx=canvas.getContext('2d'),detail=$('knowledge-detail');
  const search=$('atlas-search'),results=$('search-results'),chapterSelect=$('atlas-chapter');
  const chapterColors=['#657ea1','#8b7d98','#648c91','#a28c68','#9b7c7c','#7c927d','#77839b','#ad9276','#94839b'];
  const chapterColor=id=>chapterColors[Number(id)-1]||'#77839b';
  const chapterInk=id=>'#'+chapterColor(id).slice(1).match(/../g).map(value=>Math.round(parseInt(value,16)*.72).toString(16).padStart(2,'0')).join('');
  const palette={concept:'#8490a3',person:'#8490a3',organization:'#8490a3',work:'#8490a3',technology:'#8490a3',event:'#8490a3'};
  const types=new Map(data.types.map(t=>[t.id,{...t,color:palette[t.id]}])),activeTypes=new Set(data.types.map(t=>t.id));
  const relationTypes=new Map(data.relationTypes.map(type=>[type.id,type.label]));
  const relationName=edge=>relationTypes.get(edge.relationType)||'同段共现';
  const relationCards=new Map();
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const initialCamera=()=>({zoom:1.12,panX:0,panY:0});
  const font="'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',sans-serif";
  const nodeLabel=node=>types.get(node.type).label+' · '+node.label;
  function nodeLabelLayout(node){
    const limit=Math.min(width-32,width<650?180:300),text=nodeLabel(node);let lines=[text];
    if(width<650||ctx.measureText(text).width>limit){
      lines=[types.get(node.type).label+' ·'];let line='';
      for(const char of node.label){if(line&&ctx.measureText(line+char).width>limit){lines.push(line);line=char;}else line+=char;}if(line)lines.push(line);
    }
    return {lines,w:Math.max(...lines.map(line=>ctx.measureText(line).width))+16,h:lines.length===1?30:lines.length*23+8};
  }
  let camera=initialCamera(),width=0,height=0,selected=null,hovered=null,chapter='',query='',frame=0,cameraTransition=null,focusedGroup=null;
  let hits=[],relationHits=[],hoveredEdge=null,drag=null,pinch=null,suppressClick=false;const pointers=new Map();
  let nebulaMode=true,nebulaAmount=1,nebulaTransition=null,arrivalStart=null,arrival=motion.matches?1:0;
  let galaxyRotation=0,lastGalaxyTime=null;
  function el(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  function announce(text){$('atlas-status').textContent=text;}
  function schedule(){if(!frame)frame=requestAnimationFrame(draw);}
  function setNebula(value){
    if(nebulaMode===value)return;nebulaMode=value;hovered=hoveredEdge=null;
    $('nebula-toggle').textContent=value?'展开章节':'返回星云';$('nebula-toggle').setAttribute('aria-pressed',String(value));
    stage.classList[value?'add':'remove']('is-nebula');$('nebula-caption').hidden=true;
    if(motion.matches){nebulaAmount=value?1:0;nebulaTransition=null;}else nebulaTransition={from:nebulaAmount,to:value?1:0,start:null};schedule();
  }
  function transitionTo(target,duration=260){if(motion.matches){camera=target;cameraTransition=null;}else cameraTransition={from:{...camera},to:target,start:null,duration};schedule();}
  function available(){return model.search(query,chapter,activeTypes);}
  function includeCo(){return $('show-cooccurrence').checked;}
  function proofFor(node){return (chapter&&node.evidence.map(id=>data.evidence[id]).find(p=>p.chapter===chapter))||data.evidence[node.primary];}
  function updateCount(){const count=available().length;$('visible-count').textContent=count+'/'+data.nodes.length;return count;}
  function resize(){width=stage.clientWidth;height=stage.clientHeight-64;const ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);schedule();}
  function draw(time){
    if(lastGalaxyTime!==null&&nebulaMode&&!selected&&!hovered&&!drag&&!motion.matches&&!document.hidden)galaxyRotation+=Math.min(48,time-lastGalaxyTime)*.00011;
    lastGalaxyTime=time;
    if(arrivalStart===null)arrivalStart=time;
    arrival=motion.matches?1:smoothstep(0,1100,time-arrivalStart);
    if(nebulaTransition){if(nebulaTransition.start===null)nebulaTransition.start=time;const progress=clamp((time-nebulaTransition.start)/950,0,1),ease=progress*progress*(3-2*progress);nebulaAmount=nebulaTransition.from+(nebulaTransition.to-nebulaTransition.from)*ease;if(progress===1)nebulaTransition=null;}
    if(cameraTransition){
      if(cameraTransition.start===null)cameraTransition.start=time;
      const progress=clamp((time-cameraTransition.start)/cameraTransition.duration,0,1),ease=1-Math.pow(1-progress,3);
      for(const key of Object.keys(camera))camera[key]=cameraTransition.from[key]+(cameraTransition.to[key]-cameraTransition.from[key])*ease;
      if(progress===1)cameraTransition=null;
    }
    frame=0;
    ctx.clearRect(0,0,width,height);hits=[];relationHits=[];
    if(nebulaAmount>0){drawNebula();if(nebulaTransition||(nebulaMode&&arrival<1)||cameraTransition||(nebulaMode&&!selected&&!hovered&&!drag&&!motion.matches&&!document.hidden))schedule();return;}
    const visibleIds=new Set(available().map(n=>n.id));
    const relatedIds=new Set(selected?model.related(selected,includeCo()).map(item=>item.node.id):[]);
    const detailAlpha=smoothstep(1.85,2.85,camera.zoom);
    const points=new Map(data.nodes.map(n=>[n.id,project(displayPosition(n,layout,camera.zoom),camera,width,height)]));
    const spacing=new Map();
    const visiblePoints=Array.from(visibleIds,id=>({id,...points.get(id)}));
    for(const a of visiblePoints){let nearest=Infinity;for(const b of visiblePoints){if(a.id!==b.id)nearest=Math.min(nearest,Math.hypot(a.x-b.x,a.y-b.y));}spacing.set(a.id,nearest);}
    const appearances=new Map(data.nodes.map(node=>[node.id,pointAppearance({guide:guides.has(node.id),depth:points.get(node.id).depth,detailAlpha,active:node.id===selected,hot:node.id===hovered,neighbor:relatedIds.has(node.id),selected,visible:visibleIds.has(node.id),spacing:spacing.get(node.id)})]));
    const level=$('view-level');
    const viewportGroups=layout.groups.map(group=>({group,score:group.members.reduce((score,node)=>{const p=points.get(node.id);return score+(p.x>0&&p.x<width&&p.y>55&&p.y<height-140?1:0);},0),distance:Math.hypot(project(group,camera,width,height).x-width/2,project(group,camera,width,height).y-viewFrame(width,height).cy)})).filter(item=>item.score>0).sort((a,b)=>a.distance-b.distance);
    const currentGroup=selected?layout.positions.get(selected).group:hovered&&model.byId.has(hovered)?layout.positions.get(hovered).group:hovered&&hovered.startsWith('cluster-')?layout.groups.find(group=>group.id===hovered.slice(8)):camera.zoom>=1.65&&viewportGroups.length?viewportGroups[0].group:focusedGroup&&layout.groups.find(group=>group.id===focusedGroup);
    level.textContent=currentGroup?currentGroup.title+' · 二维视图':camera.zoom<1.65?'远景 · 九章星群 · 点击走近':'近景 · 章节 / 小节 / 知识点';
    level.style.color=currentGroup?chapterInk(currentGroup.id):'#5e6d85';
    const viewDot=document.querySelector('.view-dot');if(viewDot)viewDot.style.background=currentGroup?chapterColor(currentGroup.id):'#8490a3';
    const showExplicit=$('show-explicit').checked,co=includeCo(),only=$('selected-only').checked;
    const displayedEdges=sceneEdges(data,visibleIds,guides,detailAlpha,showExplicit,co,selected,only);
    for(const edge of displayedEdges){
      const active=selected&&(edge.source===selected||edge.target===selected);
      if(only&&selected&&!active)continue;
      const a=points.get(edge.source),b=points.get(edge.target);
      const distance=Math.hypot(b.x-a.x,b.y-a.y),start=appearances.get(edge.source).radius+2,end=appearances.get(edge.target).radius+2;
      if(distance<=start+end)continue;
      ctx.globalAlpha=active?(edge.kind==='explicit'?.85:.28):edge.kind==='explicit'?.38+detailAlpha*.15:detailAlpha*.04;
      ctx.strokeStyle=active?chapterColor(model.byId.get(selected).chapter):edge.kind==='explicit'?chapterColor(model.byId.get(edge.source).chapter):'#9aabc5';ctx.lineWidth=active?1.8:1;
      const ax=a.x+(b.x-a.x)*start/distance,ay=a.y+(b.y-a.y)*start/distance,bx=b.x-(b.x-a.x)*end/distance,by=b.y-(b.y-a.y)*end/distance;
      ctx.setLineDash(edge.kind!=='explicit'?[2,5]:edge.relationType==='contrast'?[6,4]:edge.relationType==='critique'?[3,4]:[]);ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke();
      if(active&&edge.kind==='explicit'){
        relationHits.push({edge,ax,ay,bx,by});
        if(edge.directed&&distance>45){const angle=Math.atan2(by-ay,bx-ax),length=6;ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(bx-length*Math.cos(angle-.45),by-length*Math.sin(angle-.45));ctx.lineTo(bx,by);ctx.lineTo(bx-length*Math.cos(angle+.45),by-length*Math.sin(angle+.45));ctx.stroke();}
      }
    }
    ctx.setLineDash([]);
    const candidates=[];
    for(const node of data.nodes.slice().sort((a,b)=>points.get(a.id).z-points.get(b.id).z)){
      const p=points.get(node.id);if(p.x<-100||p.x>width+100||p.y<-50||p.y>height+50)continue;
      const visible=visibleIds.has(node.id),active=node.id===selected,hot=node.id===hovered,neighbor=relatedIds.has(node.id);
      const guide=guides.has(node.id);
      const {opacity,radius}=appearances.get(node.id),person=node.type==='person';
      ctx.globalAlpha=opacity;ctx.fillStyle=chapterColor(node.chapter);
      if(guide&&!person&&!active&&!hot){
        ctx.globalAlpha=opacity*.13;ctx.strokeStyle=chapterColor(node.chapter);ctx.lineWidth=.8;
        const ray=8;ctx.beginPath();ctx.moveTo(p.x-ray,p.y);ctx.lineTo(p.x+ray,p.y);ctx.moveTo(p.x,p.y-ray);ctx.lineTo(p.x,p.y+ray);ctx.stroke();ctx.globalAlpha=opacity;
      }
      ctx.beginPath();
      if(person){ctx.lineWidth=Math.min(1.6,Math.max(1.1,radius*.33));ctx.strokeStyle=chapterColor(node.chapter);ctx.arc(p.x,p.y,Math.max(.5,radius-ctx.lineWidth/2),0,Math.PI*2);ctx.stroke();}
      else{ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fill();}
      if(active){
        const from=radius+2,to=Math.min(radius+7,(spacing.get(node.id)||Infinity)*.48);
        if(to>from){ctx.strokeStyle=chapterInk(node.chapter);ctx.lineWidth=1.6;ctx.globalAlpha=.98;ctx.beginPath();ctx.moveTo(p.x-from,p.y);ctx.lineTo(p.x-to,p.y);ctx.moveTo(p.x+from,p.y);ctx.lineTo(p.x+to,p.y);ctx.moveTo(p.x,p.y-from);ctx.lineTo(p.x,p.y-to);ctx.moveTo(p.x,p.y+from);ctx.lineTo(p.x,p.y+to);ctx.stroke();}
      }
      if(visible){hits.push({node,x:p.x,y:p.y,r:Math.max(8,radius+5)});if(active||hot)candidates.push({node,p,active,hot,opacity,neighbor});}
    }
    candidates.sort((a,b)=>Number(b.active||b.hot)-Number(a.active||a.hot)||Number(b.neighbor)-Number(a.neighbor)||Number(b.node.chapter===(currentGroup&&currentGroup.id))-Number(a.node.chapter===(currentGroup&&currentGroup.id)));
    const bottomReserve=width<650?180:120;
    const occupied=drawConstellations(visibleIds);
    occupied.push({x:0,y:0,w:width,h:55},{x:0,y:height-bottomReserve,w:width,h:bottomReserve},...hits.filter(h=>!h.box).map(h=>({x:h.x-9,y:h.y-9,w:18,h:18})));
    let labelCount=0;
    for(const item of candidates){
      if(labelCount>=(width<650?10:24)&&!item.active&&!item.hot)continue;
      const {node,p,active,hot,opacity}=item;ctx.font=(active||hot?'600 ':'500 ')+(active||hot?17:14)+'px '+font;
      const {lines,w,h}=nodeLabelLayout(node);
      const options=[{x:p.x+16,y:p.y-h/2,w,h},{x:p.x-w-16,y:p.y-h/2,w,h},{x:p.x-w/2,y:p.y-h-16,w,h},{x:p.x-w/2,y:p.y+16,w,h}];
      let box=options.find(b=>b.x>=6&&b.x+w<width-6&&b.y>6&&b.y+h<height-bottomReserve&&!occupied.some(other=>overlap(b,other)));
      if(!box&&(active||hot)){
        let nearest=Infinity;
        for(let y=62;y<height-bottomReserve-h;y+=12)for(let x=8;x<width-w-8;x+=12){
          const candidate={x,y,w,h};if(occupied.some(other=>overlap(candidate,other)))continue;
          const distance=Math.hypot(x+w/2-p.x,y+h/2-p.y);if(distance<nearest){nearest=distance;box=candidate;}
        }
        if(nearest>(width<650?220:110))box=null;
      }
      if(!box)continue;
      ctx.globalAlpha=active||hot?.98:opacity;
      ctx.textBaseline='middle';
      ctx.strokeStyle='#fcfcfe';ctx.lineWidth=4;
      lines.forEach((line,index)=>ctx.strokeText(line,box.x+8,box.y+15+index*23));
      ctx.fillStyle=active||hot?chapterInk(node.chapter):'#35445e';ctx.textBaseline='middle';
      lines.forEach((line,index)=>ctx.fillText(line,box.x+8,box.y+15+index*23));
      occupied.push(box);hits.push({node,box});labelCount++;
    }
    // Only a few short type labels; full descriptions and all relations stay in
    // the reading panel. Hovering a line reveals that particular connection.
    let edgeLabelCount=0;
    const lineCandidates=relationHits.slice().sort((a,b)=>Number(b.edge.id===hoveredEdge)-Number(a.edge.id===hoveredEdge));
    for(const line of lineCandidates){
      const hot=line.edge.id===hoveredEdge;if(edgeLabelCount>=(hot?4:3))break;
      const text=hot?relationName(line.edge)+' · '+line.edge.label:relationName(line.edge);
      ctx.font=(hot?'600 13px ':'500 12px ')+font;
      const w=ctx.measureText(text).width+12,h=24;
      if(w>width-24)continue;
      let box=null;
      for(const t of [.5,.35,.65,.22,.78])for(const dy of [-22,10]){const b={x:line.ax+(line.bx-line.ax)*t-w/2,y:line.ay+(line.by-line.ay)*t+dy,w,h};if(!box&&b.x>6&&b.x+w<width-6&&b.y>58&&b.y+h<height-bottomReserve&&!occupied.some(other=>overlap(b,other)))box=b;}
      if(!box)continue;ctx.globalAlpha=.96;ctx.textBaseline='middle';ctx.strokeStyle='#fcfcfe';ctx.lineWidth=5;ctx.strokeText(text,box.x+6,box.y+12);ctx.fillStyle=chapterInk(model.byId.get(line.edge.source).chapter);ctx.fillText(text,box.x+6,box.y+12);occupied.push(box);edgeLabelCount++;
    }
    ctx.globalAlpha=1;$('zoom-in').disabled=camera.zoom>=6;$('zoom-out').disabled=camera.zoom<=1;
    if(cameraTransition||nebulaTransition)schedule();
  }
  function drawNebula(){
    const visible=new Set(available().map(node=>node.id));
    const positions=new Map(data.nodes.map(node=>{const a=nebulaProject(cloud.get(node.id),width,height,arrival,galaxyRotation),b=project(displayPosition(node,layout,camera.zoom),camera,width,height);return[node.id,{x:b.x+(a.x-b.x)*nebulaAmount,y:b.y+(a.y-b.y)*nebulaAmount,z:a.z,depth:a.depth,scale:a.scale}];}));
    const shown=data.nodes.filter(node=>visible.has(node.id)).sort((a,b)=>positions.get(a.id).z-positions.get(b.id).z);
    const links=selected?sceneEdges(data,visible,guides,1,true,false,selected,true):[];
    const neighbors=new Set(links.flatMap(edge=>[edge.source,edge.target]));
    for(const edge of links){
      const a=positions.get(edge.source),b=positions.get(edge.target),d=Math.hypot(b.x-a.x,b.y-a.y);if(d<16)continue;
      const dx=(b.x-a.x)/d,dy=(b.y-a.y)/d;
      relationHits.push({edge,ax:a.x+dx*7,ay:a.y+dy*7,bx:b.x-dx*7,by:b.y-dy*7});
      ctx.globalAlpha=.58;ctx.strokeStyle=chapterColor(model.byId.get(selected).chapter);ctx.lineWidth=1.1;ctx.setLineDash(edge.relationType==='contrast'?[5,4]:edge.relationType==='critique'?[2,4]:[]);
      ctx.beginPath();ctx.moveTo(a.x+dx*7,a.y+dy*7);ctx.lineTo(b.x-dx*7,b.y-dy*7);ctx.stroke();
      if(edge.directed){const x=b.x-dx*7,y=b.y-dy*7;ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(x-dx*5-dy*2.5,y-dy*5+dx*2.5);ctx.lineTo(x,y);ctx.lineTo(x-dx*5+dy*2.5,y-dy*5-dx*2.5);ctx.stroke();}
    }
    ctx.setLineDash([]);
    for(const node of shown){
      const p=positions.get(node.id),point=cloud.get(node.id);let spacing=Infinity;
      for(const other of shown){if(other.id===node.id)continue;const q=positions.get(other.id);spacing=Math.min(spacing,Math.hypot(p.x-q.x,p.y-q.y));}
      const hot=node.id===hovered||node.id===selected,r=Math.min(hot?6:(1.9+point.weight*2.5)*(.78+p.depth*.45),spacing*.4),alpha=hot?.98:selected?(neighbors.has(node.id)?.82:.36):(.44+point.weight*.22+p.depth*.2)*(.8+.2*arrival);
      ctx.shadowBlur=point.weight>.8&&p.depth>.5?5:0;ctx.shadowColor=chapterColor(node.chapter)+'55';
      ctx.globalAlpha=alpha;ctx.fillStyle=ctx.strokeStyle=chapterColor(node.chapter);ctx.beginPath();
      if(node.type==='person'){ctx.lineWidth=Math.min(1.3,r*.6);ctx.arc(p.x,p.y,Math.max(.2,r-ctx.lineWidth/2),0,Math.PI*2);ctx.stroke();}else{ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();}
      hits.push({node,x:p.x,y:p.y,r:Math.max(6,r+3)});
    }
    ctx.shadowBlur=0;
    if(hovered&&model.byId.has(hovered)){
      const node=model.byId.get(hovered),p=positions.get(node.id);ctx.font='600 15px '+font;const text=node.chapter+' · '+nodeLabel(node),w=ctx.measureText(text).width+16;
      const boxes=shown.map(n=>{const q=positions.get(n.id);return{x:q.x-6,y:q.y-6,w:12,h:12};});let box=null;
      for(const dy of [-34,16,-60,42])for(const side of [1,-1]){const b={x:clamp(p.x+(side===1?14:-w-14),8,width-w-8),y:p.y+dy,w,h:26};if(!box&&b.y>58&&b.y+26<height-140&&!boxes.some(other=>overlap(b,other)))box=b;}
      if(box){ctx.globalAlpha=1;ctx.textBaseline='middle';ctx.strokeStyle='#fcfcfe';ctx.lineWidth=5;ctx.strokeText(text,box.x+8,box.y+13);ctx.fillStyle=chapterInk(node.chapter);ctx.fillText(text,box.x+8,box.y+13);}
    }
    ctx.globalAlpha=1;$('view-level').textContent=nebulaMode?'全书星云 · 三维银河':'星云展开 · 走近九章';
    $('zoom-in').disabled=$('zoom-out').disabled=false;
  }
  function drawConstellations(visibleIds){
    const bottom=height-(width<650?180:120),occupied=[{x:0,y:0,w:width,h:58},{x:0,y:bottom,w:width,h:height-bottom}];
    const starBoxes=[];
    for(const node of data.nodes){if(!visibleIds.has(node.id))continue;const p=project(displayPosition(node,layout,camera.zoom),camera,width,height);starBoxes.push({x:p.x-9,y:p.y-9,w:18,h:18});}
    const nameReservations=[];
    for(const node of data.nodes){
      if(node.id!==hovered&&node.id!==selected)continue;
      const p=project(displayPosition(node,layout,camera.zoom),camera,width,height);ctx.font='600 17px '+font;
      const {w,h}=nodeLabelLayout(node);
      const free=b=>b.x>=6&&b.x+w<width-6&&b.y>58&&b.y+h<bottom&&!occupied.concat(starBoxes,nameReservations).some(other=>overlap(b,other));
      let box=[{x:p.x+16,y:p.y-h/2,w,h},{x:p.x-w-16,y:p.y-h/2,w,h},{x:p.x-w/2,y:p.y-h-16,w,h},{x:p.x-w/2,y:p.y+16,w,h}].find(free);
      if(!box){let nearest=width<650?220:110;for(let y=62;y<bottom-h;y+=12)for(let x=8;x<width-w-8;x+=12){const candidate={x,y,w,h},distance=Math.hypot(x+w/2-p.x,y+h/2-p.y);if(distance<nearest&&free(candidate)){nearest=distance;box=candidate;}}}
      if(box)nameReservations.push(box);
    }
    function place(lines,size,center,above,below,limit){
      ctx.font='500 '+size+'px '+font;
      const w=Math.max(...lines.map(line=>ctx.measureText(line).width))+12,h=lines.length*(size+7)+6;
      const x=clamp(center.x-w/2,8,Math.max(8,width-w-8));
      const options=[0,-24,24,-48,48].map(shift=>({x:clamp(x+shift,8,Math.max(8,width-w-8)),y:Math.max(64,above-h-14),w,h}));
      const free=b=>b.x>=6&&b.x+b.w<width-6&&b.y>58&&b.y+b.h<bottom&&!occupied.concat(starBoxes,nameReservations).some(other=>overlap(b,other));
      let box=options.find(free);
      if(!box&&camera.zoom<1.65){let best=Infinity;for(let y=64;y<Math.min(bottom-h,above-h-10);y+=9)for(let x=8;x<width-w-8;x+=9){const candidate={x,y,w,h};if(!free(candidate))continue;const score=Math.hypot(x+w/2-center.x,y+h/2-center.y);if(score<best){box=candidate;best=score;}}}
      if(!box)return null;
      ctx.textBaseline='middle';ctx.textAlign='start';ctx.globalAlpha=1;ctx.lineWidth=4;ctx.strokeStyle='#fcfcfe';
      lines.forEach((line,index)=>ctx.strokeText(line,box.x+6,box.y+size/2+5+index*(size+7)));
      return box;
    }
    const sorted=layout.groups.slice().sort((a,b)=>Number(b.id===focusedGroup)-Number(a.id===focusedGroup));
    for(const group of sorted){
      const members=group.members.filter(node=>visibleIds.has(node.id));if(!members.length)continue;
      const projected=members.map(node=>project(displayPosition(node,layout,camera.zoom),camera,width,height));
      const visible=projected.filter(p=>p.x>0&&p.x<width&&p.y>55&&p.y<bottom);if(!visible.length)continue;
      const center=project(group,camera,width,height),minY=Math.min(...projected.map(p=>p.y)),maxY=Math.max(...projected.map(p=>p.y));
      const size=width<1100?14:16,maxWidth=width<650?150:Math.min(320,(width-90)/3),lines=[];ctx.font='500 '+size+'px '+font;let line='';
      for(const char of group.title.match(/——|./gu)){if(line&&ctx.measureText(line+char).width>maxWidth){lines.push(line);line=char;}else line+=char;}if(line)lines.push(line);
      const box=place(lines,size,center,minY,maxY,Math.max(...projected.map(p=>Math.abs(p.x-center.x))));
      if(!box){
        if(width>=650)continue;
        const marker=place([group.id],14,center,minY,maxY,20);if(!marker)continue;
        ctx.font='500 14px '+font;ctx.fillStyle=chapterColor(group.id);ctx.fillText(group.id,marker.x+6,marker.y+12);
        occupied.push(marker);hits.push({node:{id:'cluster-'+group.id,kind:'cluster',group},box:marker});continue;
      }
      ctx.fillStyle=chapterColor(group.id);lines.forEach((text,index)=>ctx.fillText(text,box.x+6,box.y+size/2+5+index*(size+7)));
      occupied.push(box);hits.push({node:{id:'cluster-'+group.id,kind:'cluster',group},box});
    }
    return occupied;
  }
  function hit(point){
    for(let i=hits.length-1;i>=0;i--){const h=hits[i];if(h.box&&point.x>=h.box.x&&point.x<=h.box.x+h.box.w&&point.y>=h.box.y&&point.y<=h.box.y+h.box.h)return h.node;}
    let nearest=null,distance=Infinity;
    for(const h of hits){if(h.box)continue;const d=Math.hypot(point.x-h.x,point.y-h.y);if(d<=h.r&&d<distance){nearest=h.node;distance=d;}}
    if(nearest)return nearest;
    let connection=null,edgeDistance=6;
    for(const line of relationHits){const dx=line.bx-line.ax,dy=line.by-line.ay,t=((point.x-line.ax)*dx+(point.y-line.ay)*dy)/(dx*dx+dy*dy);if(t<.08||t>.92)continue;const d=Math.hypot(point.x-line.ax-t*dx,point.y-line.ay-t*dy);if(d<edgeDistance){edgeDistance=d;connection={id:line.edge.id,kind:'relation',edge:line.edge};}}
    return connection;
  }
  function local(event){const box=canvas.getBoundingClientRect();return{x:event.clientX-box.left,y:event.clientY-box.top};}
  function zoom(factor,point={x:width/2,y:viewFrame(width,height).cy}){setNebula(false);hovered=null;canvas.style.cursor='grab';transitionTo(zoomCamera(cameraTransition?cameraTransition.to:camera,factor,point,width,height),220);}
  function syncTypes(){document.querySelectorAll('[data-node-type]').forEach(button=>button.setAttribute('aria-pressed',String(activeTypes.has(button.dataset.nodeType))));}
  function showWelcome(){
    detail.replaceChildren();relationCards.clear();detail.append(el('p','detail-kicker','从星点，回到书页'),el('h2','welcome-title','选一颗星，读到原文。'));
    detail.append(el('p','welcome-label','不妨从这里开始'));
    for(const id of ['bauhaus','skin','high-design']){const node=model.byId.get(id),button=el('button','welcome-button',node.label+'  ↗︎');button.type='button';button.addEventListener('click',()=>selectNode(id,true));detail.append(button);}
    const chapters=el('details','chapter-directory');chapters.append(el('summary','','按章节浏览'));
    for(const group of layout.groups){const button=el('button','welcome-button',group.title+' ↗︎');button.type='button';button.addEventListener('click',()=>focusGroup(group.id));chapters.append(button);}detail.append(chapters);
    $('detail-jump').hidden=true;
  }
  function focusGroup(id){
    setNebula(false);
    const group=layout.groups.find(item=>item.id===id);if(!group)return;
    selected=hovered=null;focusedGroup=id;results.hidden=true;
    const target={...camera,zoom:3.25},point=project(group,target,width,height);
    target.panX+=width/2-point.x;target.panY+=viewFrame(width,height).cy-point.y;transitionTo(target,460);
    detail.replaceChildren();detail.append(el('p','detail-kicker','章节 / 原文导航'),el('h2','',group.title),el('p','detail-note','沿着星点走近一个知识点，查看它的解释、原文和关系证据。也可以从下方名称直接进入。'));
    const ids=new Set(available().map(node=>node.id)),members=group.members.filter(node=>ids.has(node.id));
    detail.append(el('p','welcome-label',members.length+' 个知识点'));
    for(const node of members){const button=el('button','welcome-button',node.label+' ↗︎');button.type='button';button.addEventListener('click',()=>selectNode(node.id,true));detail.append(button);}
    const original=el('a','original-link','阅读本章原文 ↗︎');original.href='chapter'+group.id+'/index.html';original.style.backgroundColor=chapterInk(group.id);detail.append(original);
    $('atlas-filters').open=false;announce('正在展开'+group.title+'，共'+members.length+'个知识点。');
  }
  function proofDetails(proof,label='原文证据'){
    const details=el('details','source-details'),summary=el('summary','',label);details.append(summary,el('blockquote','proof-quote',proof.quote));
    const link=el('a','proof-link',proof.title+' · 定位原文 ↗︎');link.href=proof.href;details.append(link);return details;
  }
  function showDetail(){
    if(!selected){showWelcome();return;}
    const node=model.byId.get(selected),type=types.get(node.type),proof=proofFor(node);
    detail.replaceChildren();relationCards.clear();const kicker=el('p','detail-kicker',layout.groups.find(group=>group.id===node.chapter).title+' · '+type.label);kicker.style.color=chapterColor(node.chapter);detail.append(kicker,el('h2','',node.label));
    if(node.note)detail.append(el('p','detail-note',node.note));
    detail.append(el('p','detail-label',node.note?'原文依据':'原文中的说明'),el('blockquote','detail-quote',node.excerpt));
    const original=el('a','original-link');original.href=data.evidence[node.primary].href;original.style.backgroundColor=chapterInk(node.chapter);original.append(el('span','','阅读这段原文'),el('span','','↗︎'));detail.append(original);detail.append(el('p','source-title',data.evidence[node.primary].title));
    detail.append(proofDetails(data.evidence[node.primary],'展开完整原文段落'));
    if(proof.id!==node.primary)detail.append(proofDetails(proof,'当前章节中的原文'));
    const other=node.evidence.filter(id=>id!==node.primary&&id!==proof.id);
    if(other.length){const sources=el('details','source-details');sources.append(el('summary','','更多出处 · '+other.length+' 段'));for(const id of other){const p=data.evidence[id],link=el('a','',p.title+' ↗︎');link.href=p.href;sources.append(link);}detail.append(sources);}
    const related=model.related(node.id,includeCo());
    const relationHost=detail;
    detail.append(el('h3','relations-title','有证据的关联 · '+related.length));
    if(related.some(item=>item.edge.kind==='explicit')){
      const navigation=el('div','relation-navigation'),overview=el('button','','查看关联分布 ↗︎'),close=el('button','','近看知识点');overview.type=close.type='button';
      overview.addEventListener('click',()=>{hovered=hoveredEdge=null;chapter='';chapterSelect.value='';data.types.forEach(type=>activeTypes.add(type.id));syncTypes();updateCount();transitionTo(initialCamera(),420);schedule();});close.addEventListener('click',()=>{setNebula(false);selectNode(node.id,true);});navigation.append(overview,close);detail.append(navigation,el('p','relation-hint','默认最多展开所选节点的 10 条明示联系，完整关系列在下方。实线与箭头表示方向，虚线用于对比或批评；悬停连线看说明，点击查看证据。'));
    }
    if(!related.length)detail.append(el('p','no-relations','这个节点暂无已逐条核对的明示关系。可在“筛选与显示”中打开“同段共现”，查看与它在原文同段出现的其他知识点。'));
    let previousSection='';
    for(const item of related){
      const section=item.edge.kind!=='explicit'?'原文同段出现':item.edge.crossChapter?'跨章节联系':'本章联系';
      if(section!==previousSection){relationHost.append(el('h4','relation-section',section+' · '+related.filter(other=>(other.edge.kind!=='explicit'?'原文同段出现':other.edge.crossChapter?'跨章节联系':'本章联系')===section).length));previousSection=section;}
      const card=el('article','relation-card'),button=el('button','relation-target');button.type='button';button.append(el('span','',item.node.label),el('span','','↗︎'));button.addEventListener('click',()=>selectNode(item.node.id,true));
      button.style.color=chapterInk(item.node.chapter);
      const statement=item.edge.kind==='explicit'?model.byId.get(item.edge.source).label+(item.edge.directed?' → ':' ↔︎ ')+model.byId.get(item.edge.target).label+' · '+item.edge.label:'文本事实 · 原文同段出现';
      const meta=el('p','relation-meta');meta.append(el('span','relation-type',relationName(item.edge)),el('span','relation-chapter',layout.positions.get(item.node.id).group.title));
      card.append(button,meta,el('p','relation-label '+item.edge.kind,statement));
      const evidence=el('details');evidence.append(el('summary','','查看原文证据 · '+item.edge.evidence.length+' 段'));
      let loaded=false;
      evidence.addEventListener('toggle',()=>{
        if(!evidence.open||loaded)return;loaded=true;
        for(const id of item.edge.evidence){const p=data.evidence[id],quote=el('blockquote','proof-quote'),focus=item.edge.evidenceFocus?.[id],at=focus?p.quote.indexOf(focus):-1;if(at>=0)quote.append(el('span','',p.quote.slice(0,at)),el('mark','',focus),el('span','',p.quote.slice(at+focus.length)));else quote.textContent=p.quote;evidence.append(quote);const link=el('a','proof-link',p.title+' · 定位原文 ↗︎');link.href=p.href;evidence.append(link,el('p','proof-source','源文件 '+p.source+' · 第 '+p.line+' 行'));}
      });
      card.append(evidence);relationHost.append(card);
      relationCards.set(item.edge.id,{card,evidence});
    }
    $('detail-jump').hidden=false;
  }
  function selectNode(id,focus){
    const node=model.byId.get(id);if(!node)return;selected=id;hovered=hoveredEdge=null;focusedGroup=node.chapter;query='';search.value='';results.hidden=true;
    if(chapter&&!node.chapters.includes(chapter)){chapter='';chapterSelect.value='';}activeTypes.add(node.type);syncTypes();
    if(focus&&!nebulaMode){const target={...camera,zoom:Math.max(3.25,camera.zoom)},p=project(displayPosition(node,layout,target.zoom),target,width,height);target.panX+=width/2-p.x;target.panY+=viewFrame(width,height).cy-p.y;transitionTo(target,360);}
    showDetail();$('atlas-filters').open=false;updateCount();schedule();
    announce('已选择'+node.label+'。'+model.related(id,false).length+'条原文明示关系，解释与出处已显示。');
  }
  function clearSelection(){selected=hovered=hoveredEdge=null;cameraTransition=null;showWelcome();announce('已取消选择，保留当前缩放与位置。');schedule();}
  function resetAll(){cameraTransition=null;camera=initialCamera();selected=hovered=hoveredEdge=focusedGroup=null;chapter=query='';search.value='';chapterSelect.value='';results.hidden=true;activeTypes.clear();data.types.forEach(t=>activeTypes.add(t.id));syncTypes();showWelcome();updateCount();schedule();}
  function updateResults(){
    query=search.value.trim();selected=hovered=focusedGroup=null;showWelcome();results.replaceChildren();results.hidden=!query;
    const found=available();if(query){if(!found.length)results.append(el('p','','没有匹配节点，可调整类型或章节范围。'));for(const node of found.slice(0,15)){const button=el('button','',node.label);button.type='button';button.append(el('small','',types.get(node.type).label));button.addEventListener('click',()=>selectNode(node.id,true));results.append(button);}announce('找到'+found.length+'个知识点。');}
    updateCount();schedule();
  }
  for(const group of layout.groups){const legend=el('button'),dot=el('i');legend.type='button';legend.title=group.title;legend.setAttribute('aria-label',group.title);dot.style.background=chapterColor(group.id);legend.append(dot,el('span','',group.id));legend.addEventListener('click',()=>focusGroup(group.id));$('map-legend').append(legend);}
  for(const type of types.values()){
    const button=el('button');button.type='button';button.dataset.nodeType=type.id;button.setAttribute('aria-pressed','true');const chip=el('i');chip.style.background=type.color;button.append(chip,el('span','',type.label));
    button.addEventListener('click',()=>{if(activeTypes.has(type.id))activeTypes.delete(type.id);else activeTypes.add(type.id);syncTypes();updateResults();});$('type-filters').append(button);
  }
  for(const group of data.chapters){const option=el('option','',group.title);option.value=group.id;chapterSelect.append(option);}
  $('atlas-count').textContent=data.nodes.length+' 个知识点 / '+data.counts.explicit+' 条明示关系 · 含 '+data.counts.crossChapter+' 条跨章联系';$('explicit-count').textContent=data.counts.explicit;
  const directory=$('node-list');
  for(const type of data.types){directory.append(el('h3','',type.label));for(const node of data.nodes.filter(n=>n.type===type.id)){const button=el('button','',node.label);button.type='button';button.addEventListener('click',()=>{selectNode(node.id,true);directory.hidden=true;$('list-toggle').setAttribute('aria-expanded','false');detail.focus({preventScroll:true});});directory.append(button);}}
  $('list-toggle').addEventListener('click',event=>{directory.hidden=!directory.hidden;event.currentTarget.setAttribute('aria-expanded',String(!directory.hidden));});
  chapterSelect.addEventListener('change',()=>{chapter=chapterSelect.value;updateResults();if(chapter)focusGroup(chapter);else{cameraTransition=null;camera=initialCamera();schedule();}});
  search.addEventListener('input',updateResults);
  search.addEventListener('keydown',event=>{if(event.key==='Escape'){search.value='';updateResults();}if(event.key==='Enter'&&query){const first=available()[0];if(first){event.preventDefault();selectNode(first.id,true);}}if(event.key==='ArrowDown'&&!results.hidden){const first=results.querySelector('button');if(first){event.preventDefault();first.focus();}}});
  results.addEventListener('keydown',event=>{if(event.key==='Escape'){results.hidden=true;search.focus();}if(!['ArrowDown','ArrowUp'].includes(event.key))return;const buttons=Array.from(results.querySelectorAll('button')),index=buttons.indexOf(document.activeElement),next=buttons[clamp(index+(event.key==='ArrowDown'?1:-1),0,buttons.length-1)];if(next){event.preventDefault();next.focus();}});
  $('show-cooccurrence').addEventListener('change',()=>{showDetail();schedule();});
  $('show-explicit').addEventListener('change',schedule);$('selected-only').addEventListener('change',schedule);
  motion.addEventListener('change',()=>{if(motion.matches){if(cameraTransition){camera=cameraTransition.to;cameraTransition=null;}if(nebulaTransition){nebulaAmount=nebulaTransition.to;nebulaTransition=null;}arrival=1;}schedule();});
  $('zoom-in').addEventListener('click',()=>zoom(1.22));$('zoom-out').addEventListener('click',()=>zoom(1/1.22));$('fit-map').addEventListener('click',resetAll);
  $('nebula-toggle').addEventListener('click',()=>{if(nebulaMode)setNebula(false);else{resetAll();setNebula(true);}});
  document.addEventListener('visibilitychange',()=>{lastGalaxyTime=null;if(!document.hidden)schedule();});
  canvas.addEventListener('wheel',event=>{event.preventDefault();zoom(Math.exp(-event.deltaY*.0013),local(event));},{passive:false});
  canvas.addEventListener('contextmenu',event=>event.preventDefault());
  canvas.addEventListener('pointerdown',event=>{
    if(event.button!==0&&event.button!==2&&event.pointerType!=='touch')return;
    cameraTransition=null;
    const p=local(event);canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);pointers.set(event.pointerId,p);
    drag={start:p,last:p,mode:'pan'};suppressClick=event.button===2;
    if(pointers.size===2){const[a,b]=Array.from(pointers.values());pinch={distance:Math.hypot(a.x-b.x,a.y-b.y),center:{x:(a.x+b.x)/2,y:(a.y+b.y)/2}};suppressClick=true;}
  });
  canvas.addEventListener('pointermove',event=>{
    const p=local(event);if(pointers.has(event.pointerId))pointers.set(event.pointerId,p);
    if(pointers.size===2&&pinch){setNebula(false);const[a,b]=Array.from(pointers.values()),distance=Math.hypot(a.x-b.x,a.y-b.y),center={x:(a.x+b.x)/2,y:(a.y+b.y)/2};if(pinch.distance>0)camera=zoomCamera(camera,distance/pinch.distance,pinch.center,width,height);camera.panX+=center.x-pinch.center.x;camera.panY+=center.y-pinch.center.y;pinch={distance,center};suppressClick=true;schedule();return;}
    if(drag&&pointers.size===1){if(Math.hypot(p.x-drag.start.x,p.y-drag.start.y)>4||suppressClick){setNebula(false);suppressClick=true;const dx=p.x-drag.last.x,dy=p.y-drag.last.y;camera.panX+=dx;camera.panY+=dy;drag.last=p;canvas.classList.add('is-dragging');schedule();}return;}
    const node=hit(p),id=node&&node.kind!=='relation'?node.id:null,edge=node&&node.kind==='relation'?node.id:null;if(hovered!==id||hoveredEdge!==edge){hovered=id;hoveredEdge=edge;canvas.style.cursor=node?'pointer':'grab';schedule();}
  });
  function release(event){pointers.delete(event.pointerId);if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);pinch=null;canvas.classList.remove('is-dragging');if(pointers.size===1){const p=Array.from(pointers.values())[0];drag={start:p,last:p,mode:'pan'};}else drag=null;}
  canvas.addEventListener('pointerup',event=>{if(!suppressClick&&pointers.size===1){const node=hit(local(event));if(node){if(node.kind==='cluster')focusGroup(node.group.id);else if(node.kind==='relation'){const target=relationCards.get(node.edge.id);if(target){target.evidence.open=true;target.card.scrollIntoView?.({behavior:motion.matches?'auto':'smooth',block:'nearest'});announce(node.edge.label+'，原文证据已展开。');}}else selectNode(node.id,false);}else clearSelection();}release(event);schedule();});
  canvas.addEventListener('pointercancel',event=>{suppressClick=true;release(event);schedule();});
  canvas.addEventListener('lostpointercapture',event=>{if(pointers.has(event.pointerId)){pointers.delete(event.pointerId);suppressClick=true;drag=pinch=null;schedule();}});
  canvas.addEventListener('pointerleave',()=>{if(!drag){hovered=hoveredEdge=null;schedule();}});
  canvas.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))setNebula(false);});
  canvas.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();cameraTransition=null;camera.panX+=event.key==='ArrowLeft'?40:event.key==='ArrowRight'?-40:0;camera.panY+=event.key==='ArrowUp'?40:event.key==='ArrowDown'?-40:0;schedule();}else if(event.key==='+'||event.key==='='){event.preventDefault();zoom(1.22);}else if(event.key==='-'){event.preventDefault();zoom(1/1.22);}else if(event.key==='Escape'){event.preventDefault();clearSelection();}else if(event.key==='Home'){event.preventDefault();resetAll();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&selected){event.preventDefault();clearSelection();}});
  document.addEventListener('pointerdown',event=>{if(!results.contains(event.target)&&event.target!==search)results.hidden=true;});
  showWelcome();updateCount();resize();
  if(window.ResizeObserver)new ResizeObserver(resize).observe(stage);else window.addEventListener('resize',resize);
  const initial=new URLSearchParams(window.location.search).get('node');if(model.byId.has(initial))selectNode(initial,true);
})();
