import{e as y,m as S,at as C,x as R,f as E,j as o,B as p,d as r,n as c,o as a,a1 as m,h as U,au as k,av as f,b as O}from"./index-da64fe47.js";import{S as N,I as q,a as b,H as Q}from"./mutations-4662eaba.js";import{d as v,R as x}from"./ExpandMore-634c78b3.js";import{C as T}from"./Container-ec43f813.js";const A=()=>{const{user:e}=y(),{data:n,loading:d,fetchMore:t}=S(C,{variables:{userId:e==null?void 0:e.id},skip:!(e!=null&&e.id),notifyOnNetworkStatusChange:!0}),g=R(),[l]=E(N),h=async s=>{e&&n&&(await l({variables:{userId:e.id,receiverId:s}}),g.writeQuery({query:C,variables:{userId:e.id},data:{getSuggestionOfCurrentUser:n.getSuggestionOfCurrentUser.filter(i=>i.id!==s)}}))};return o(p,{children:[r(c,{variant:"h3",textAlign:"center",sx:{my:1},children:"Suggestions"}),o(a,{container:!0,children:[n==null?void 0:n.getSuggestionOfCurrentUser.map(s=>r(a,{item:!0,xs:12,sm:4,md:3,sx:{p:1},children:r(q,{user:s,actions:r(m,{variant:"contained",onClick:()=>h(s.id),children:"Ajouter"})})},s.id)),d&&[1,2,3,4].map(s=>r(a,{item:!0,xs:12,sm:4,md:3,sx:{p:1},children:r(b,{})},s)),(n==null?void 0:n.getSuggestionOfCurrentUser.length)===10&&o(a,{item:!0,xs:12,onClick:()=>t({variables:{cursor:n.getSuggestionOfCurrentUser[(n==null?void 0:n.getSuggestionOfCurrentUser.length)-1].id},updateQuery:(s,{fetchMoreResult:i})=>i?{getSuggestionOfCurrentUser:[...s.getSuggestionOfCurrentUser,...i.getSuggestionOfCurrentUser]}:s}),sx:{display:"flex",justifyContent:"center",my:1,py:1,borderRadius:"15px",alignItems:"center",cursor:"pointer",":hover":{backgroundColor:"lightgrey"}},children:[r(c,{variant:"h5",children:"Afficher plus"}),r(v,{})]})]})]})},_=()=>{const{user:e}=y(),{data:n}=U(k,{variables:{userId:e==null?void 0:e.id},skip:!(e!=null&&e.id)}),d=R(),{data:t,loading:g,fetchMore:l}=S(f,{variables:{userId:e==null?void 0:e.id},skip:!(e!=null&&e.id),notifyOnNetworkStatusChange:!0}),[h]=E(Q);O.useEffect(()=>{n&&e&&t&&!t.getRequest.find(i=>i.id===n.sendRequestNotif.id)&&d.writeQuery({query:f,data:{getRequest:[n.sendRequestNotif,...t.getRequest]},variables:{userId:e.id}})},[n,t,e]);const s=async(i,u)=>{t&&e&&(await h({variables:{status:i,friendRequestId:u}}),d.writeQuery({query:f,variables:{userId:e.id},data:{getRequest:t.getRequest.filter(I=>I.id!==u)}}))};return o(p,{children:[r(c,{variant:"h3",textAlign:"center",sx:{my:1},children:"Invitations"}),o(a,{container:!0,children:[t==null?void 0:t.getRequest.map(i=>r(a,{item:!0,xs:12,sm:4,md:3,sx:{p:1},children:r(q,{user:i.User,actions:o(p,{children:[r(m,{variant:"contained",onClick:()=>s(x.ACCEPTED,i.id),children:"Confirmer"}),r(m,{variant:"contained",sx:{backgroundColor:"lightgrey",ml:1},onClick:()=>s(x.DENIED,i.id),children:"Supprimer"})]})})},i.id)),g&&[1,2,3,4].map(i=>r(a,{item:!0,xs:12,sm:4,md:3,sx:{p:1},children:r(b,{})},i)),(t==null?void 0:t.getRequest.length)===10&&o(a,{item:!0,xs:12,onClick:()=>l({variables:{cursor:t==null?void 0:t.getRequest[(t==null?void 0:t.getRequest.length)-1].id},updateQuery:(i,{fetchMoreResult:u})=>u?{getRequest:[...i.getRequest,...u.getRequest]}:i}),sx:{display:"flex",justifyContent:"center",my:1,py:1,borderRadius:"15px",alignItems:"center",cursor:"pointer",":hover":{backgroundColor:"lightgrey"}},children:[r(c,{variant:"h5",children:"Afficher plus"}),r(v,{})]})]})]})},F=()=>o(T,{children:[r(_,{}),r(A,{})]});export{F as default};
