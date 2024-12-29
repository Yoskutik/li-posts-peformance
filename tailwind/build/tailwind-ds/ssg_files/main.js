(()=>{"use strict";const e=(e,t,l)=>{const a=document.createElement(e);return Object.entries(t).forEach((([e,t])=>{a.setAttribute(e,t)})),l&&a.append(...Array.isArray(l)?l.filter(Boolean):[l]),a},t=(t,l)=>(a={},r)=>e(t,{...a,class:`${a.class||""} ${l}`.trim()},r),l={h1:t("h1","text-3xl font-bold text-gray-900"),h2:t("h2","text-2xl font-semibold text-gray-800"),h3:t("h3","text-xl font-medium text-gray-700")},a=t("p","text-base text-gray-700"),r=t("button","bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer  active:relative active:top-[1px]"),s=t("a","text-blue-500 hover:text-blue-700 underline cursor-pointer active:relative active:top-[1px]"),o=t("hr","my-2 border-gray-300"),i=({className:t,label:l,...a})=>e("label",{class:`block text-sm font-medium text-gray-700 ${t||""}`.trim()},[e("span",{class:"text-gray-700"},l),e("input",{...a,class:"mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"})]),c=({className:t,label:l,...a})=>e("label",{class:`flex items-center cursor-pointer ${t||""}`.trim()},[e("input",{class:"h-4 w-4 text-blue-500 border-gray-300 mr-1",...a,type:"checkbox"}),e("span",{class:"text-gray-700"},l)]),n=({className:t,label:l,...a})=>e("label",{class:`flex items-center cursor-pointer ${t||""}`.trim()},[e("input",{class:"h-4 w-4 text-blue-500 border-gray-300 mr-1",...a,type:"radio"}),e("span",{class:"text-gray-700"},l)]),m=({className:t,title:i,body:c})=>e("section",{class:`max-w-sm rounded-lg border border-gray-200 shadow-md p-4 ${t||""}`.trim()},[l.h3({},i),o(),a({},c),o(),e("footer",{class:"flex justify-between"},[s({},"More link"),r({},"Read More")])]),u=document.createElement("main");u.append(e("div",{},Array.from({length:1250},((t,l)=>e("div",{class:"flex border border-solid p-4"},[m({title:"Title",body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis exercitation lobortis soluta eros labore nonumy labore aliquam diam eiusmod.",className:"w-60"}),e("form",{class:"flex flex-col ml-4 w-52"},[i({label:"Field 1"}),i({label:"Field 2",className:"mt-2"}),i({label:"Field 3",className:"mt-2"}),c({label:"Checkbox",className:"mt-2 ml-auto"}),e("div",{class:"mt-2 pl-2"},[n({label:"Radio 1",value:"1",name:"radio"}),n({label:"Radio 2",value:"2",name:"radio"})]),o({class:"w-full"}),e("footer",{class:"flex justify-end"},[r({type:"reset"},"Reset"),r({type:"submit",class:"ml-2"},"Submit")])])]))))),document.getElementById("root").innerHTML="",document.getElementById("root").append(e("div",{},[u]))})();