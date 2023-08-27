//var jsYaml = require("js-yaml")
const doaddobject=(e,parent)=>{
  Object.entries(e).forEach((e,i)=>{
    const k = e[0];
    const v = e[1];
    let classes = [];
    let attrs = k.split("[");
    classes = attrs[0].split(".");
    
    const tagname = classes[0];
    if(attrs.length>1){
      attrlist = attrs;
      attrs={};
      attrlist[1].split(",").forEach(e=>{
        kv = e.split("=");
        if(kv[0]=="")return;
        if(kv.length>1){
          attrs[kv[0]]=kv[1];
        }else{
          attrs[kv[0]]="";
        }
      })
    }else{
      attrs=[];
    }
    if(classes.length>1){
      classes = classes[1].split(" ");
    }else{
      classes=[];
    }
    let el = null;
    if(tagname==""){
      el=document.createElement("div")
    }else{
      el=document.createElement(tagname)
    }
    classes.forEach(cl=>{
      if(cl=="")return;
      console.log(cl)
      try {
        el.classList.add(cl);
      } catch (error) {
        console.log(error,cl)
      }
    })
    Object.entries(attrs).forEach(kv=>{
      
      const k = kv[0];
      const v = kv[1];
      console.log(k,v);
      el.setAttribute(k, v);
    }
    )
    doadd(v,el);
    parent.appendChild(el);
    console.log(k,v);
    return el;
  });
};
const doadd=(e,parent)=>{
  if(Array.isArray(e)){
    e.forEach(i=>{
      doadd(i,parent);
    })
  }else if(typeof e=="object"){
    doaddobject(e,parent);
  }else if(typeof e=="string"){
    el = document.createTextNode(e);
    parent.appendChild(el);
    return el;
  }else if(typeof e=="number"){
    el = document.createTextNode(e);
    parent.appendChild(el);
    return el;
  }else{
    console.log("unknown type",typeof e);
  } 
}


const domtoobj=(o)=>{
  if(o.nodeType==Document.TEXT_NODE){
    return o.textContent.trim(); 
  }
  let tagname = o.tagName.toLowerCase(); 
  let arr = [];
  o.childNodes.forEach(e=>{
    const ret = domtoobj(e);
    if(ret=="")return;
    arr.push(ret);
  });
  const outmap = {};
  const classnames = Array.from(o.classList).join(" ");
  if(classnames!=""){
    tagname+="."+classnames;
  }
  if(o.attributes.length>0){
    //outmap["_attr"]={};
    if(o.attributes.length==1&&o.attributes[0].name=="class"){

    }else{
      tagname+="[";
      for (let i = 0; i < o.attributes.length; i++) {
        const e = o.attributes[i];
        if(e.name!="class"){
          console.log("attr",e.name,e.value)
          tagname+=""+e.name+"="+e.value;
        }
      }
    }
  }
  if(arr==[]){
    outmap[tagname]="";
  }else{
    outmap[tagname]=arr;
    if(arr.length==1){
      outmap[tagname]=arr[0];
    }
  }
  return outmap; 
}

fetch('/test.yaml')
  .then(res => res.blob())
  .then(blob => blob.text())
  .then(yamlAsString => {
    
    //)
    console.log('yaml res:', yamlAsString)
    try {
        const doc = jsyaml.load(yamlAsString);
        
        doadd(doc,document.body);
        console.log(doc,Object.entries(doc));
        console.log("OBJOUT:","\n"+jsyaml.dump(domtoobj(document.body)));
    } catch (e) {
    console.log(e);
    }
  })
  .catch(err => console.log('yaml err:', err))

