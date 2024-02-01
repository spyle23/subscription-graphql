import{r as q,i as B,a as M,a5 as ce,ac as le,b as h,ad as ue,d as t,j as o,B as f,e as D,D as O,n as v,ae as j,af as me,ag as X,ah as Z,N as U,I as k,ai as E,a9 as ee,aj as he,ak as ge,al as pe,am as R,an as fe,a1 as Y,ao as P,m as _,a8 as Ce,O as te,x as H,W as re,ap as ne,aq as $,X as xe,Y as ve,Z as ye,a0 as be,o as F,f as A,Q as Ie,V as T,a4 as K,ar as Pe,as as Se,J as we,h as Oe}from"./index-da64fe47.js";import{a as w,d as $e}from"./ExpandMore-634c78b3.js";var z={},ke=B;Object.defineProperty(z,"__esModule",{value:!0});var ae=z.default=void 0,De=ke(q()),Fe=M,Ue=(0,De.default)((0,Fe.jsx)("path",{d:"M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"}),"AddAPhoto");ae=z.default=Ue;const Re=({message:e,btnSx:n,onFinished:s,acceptedType:i})=>{const r=ce(),{uploadFile:m}=le(),g=h.useCallback(async l=>{const a=await m(l);s&&s(a??[])},[]),{getRootProps:C,getInputProps:x,isDragActive:d}=ue({onDrop:g});return t("div",{...C(),children:o(f,{sx:{p:3,borderRadius:3,textTransform:"none",...n,backgroundSize:"cover",cursor:"pointer",border:`1px dashed ${r.palette.primary.main}`},children:[t("input",{...x()}),o(f,{sx:{alignItems:"center",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"},children:[t(ae,{}),d?t("p",{children:"Drop the files here ..."}):t("p",{children:e})]})]})})},_e=()=>{const{user:e}=D();return e?o(f,{sx:{display:"flex",alignItems:"center"},children:[t(O,{user:e}),(e==null?void 0:e.firstname)&&(e==null?void 0:e.lastname)&&t(f,{children:t(v,{children:e.firstname+" "+e.lastname})})]}):null},Ae=j.forwardRef(function(n,s){return t(me,{direction:"up",ref:s,...n})}),Te=({createPost:e})=>{const{user:n}=D(),[s,i]=h.useState(!1),[r,m]=h.useState(!1),{register:g,formState:{errors:C},handleSubmit:x,reset:d,watch:l,onFinished:a,dropFile:c}=X(),I=async y=>{try{if(!n)return;await e(y,n.id),u()}catch(p){console.log(p)}},S=()=>{m(!0)},u=()=>{d({description:"",files:[]}),i(!1),m(!1)};return n?o(f,{children:[o(U,{elevation:1,sx:{width:{xs:350,md:500},p:2,display:"flex",alignItems:"center"},children:[t(k,{children:t(O,{user:n})}),t(E,{fullWidth:!0,InputProps:{sx:{borderRadius:"25px !important"}},onClick:S,placeholder:"Exprimer vous"}),t(k,{onClick:()=>{i(!0),S()},children:t(ee,{})})]}),o(he,{open:r,TransitionComponent:Ae,keepMounted:!0,onClose:u,"aria-describedby":"alert-dialog-slide-description",children:[t(ge,{children:t(_e,{})}),o(pe,{sx:{pt:"20px !important"},children:[t(E,{...g("description",{required:!0}),error:C.description&&!0,sx:{width:{md:350,xs:200}},InputProps:{sx:{borderRadius:"25px !important"}},placeholder:"Exprimer vous",helperText:C.description&&"La description est requise pour une publication"}),s&&t(f,{sx:{width:"100%",height:"100%",py:1,my:1,position:"relative"},children:t(Re,{onFinished:a,message:"Ajouter une image",btnSx:{height:"100%"}})}),t(R,{data:l().files,deleteFile:c})]}),o(fe,{children:[t(Y,{variant:"contained",color:"error",onClick:u,children:"Annuler"}),t(Y,{variant:"contained",onClick:x(I),children:"Publier"})]})]})]}):t(Z,{})},Ee=P`
  mutation CreatePost($data: PostInput!, $userId: Float!) {
    createPost(data: $data, userId: $userId)
  }
`,qe=P`
  query PostByUser($userId: Float!, $cursor: Float) {
    postByUser(userId: $userId, cursor: $cursor) {
      id
      description
      createdAt
      updatedAt
      nbComments
      user {
        lastname
        firstname
        photo
        id
        status
      }
      reactions {
        id
        reactionType
        userId
      }
      files {
        id
        name
        url
        extension
      }
    }
  }
`,se=P`
  query GetOrderPost($cursor: Float) {
    getOrderPost(cursor: $cursor) {
      user {
        lastname
        firstname
        photo
        id
        status
      }
      reactions {
        reactionType
        userId
      }
      nbComments
      description
      id
      files {
        name
        extension
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`,Be=()=>{const{data:e,loading:n,refetch:s,fetchMore:i,error:r,networkStatus:m}=_(se,{variables:{cursor:null},notifyOnNetworkStatusChange:!0});return{allPost:e,postLoading:n,fetchMore:i,networkStatus:m,postError:r,refetch:s}};var L={},Me=B;Object.defineProperty(L,"__esModule",{value:!0});var ie=L.default=void 0,je=Me(q()),He=M,ze=(0,je.default)((0,He.jsx)("path",{d:"M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"}),"Comment");ie=L.default=ze;const Le=P`
  mutation CreateComment(
    $commentInput: CommentInput!
    $postId: Float!
    $userId: Float!
  ) {
    createComment(commentInput: $commentInput, postId: $postId, userId: $userId)
  }
`,Q=P`
  query GetCommentByPost($postId: Float!, $cursor: Float) {
    getCommentByPost(postId: $postId, cursor: $cursor) {
      success
      message
      data {
        id
        content
        User {
          firstname
          lastname
          photo
          id
          status
        }
        files {
          name
          extension
          url
        }
        updatedAt
        createdAt
      }
    }
  }
`;var N={},Ne=B;Object.defineProperty(N,"__esModule",{value:!0});var oe=N.default=void 0,Ve=Ne(q()),J=M,Ge=(0,Ve.default)([(0,J.jsx)("path",{d:"M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"},"0"),(0,J.jsx)("path",{d:"m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"},"1")],"KeyboardDoubleArrowRight");oe=N.default=Ge;const We=j.memo(({saveComment:e})=>{const{user:n}=D(),{register:s,handleSubmit:i,reset:r,onFinished:m,watch:g,dropFile:C}=X(),x=async d=>{await e(d),r({content:"",files:[]})};return o(f,{sx:{position:"sticky",bottom:0,background:"white",p:2},children:[t(R,{data:g().files,deleteFile:C}),o(f,{sx:{display:"flex",alignItems:"center"},children:[t(O,{user:n}),t(E,{...s("content",{required:!0}),sx:{width:"100%"},InputProps:{endAdornment:t(Ce,{onFinished:m,children:t(k,{children:t(ee,{})})}),sx:{borderRadius:"25px !important"}},placeholder:"Votre commentaire"}),t(k,{onClick:i(x),children:t(oe,{})})]})]})}),Ye=(e,n)=>{const s=new Date(e),i=new Date(n);return s.getHours()===i.getHours()&&s.getMinutes()===i.getMinutes()?s:i},Ke=({createdAt:e,updatedAt:n,content:s,files:i,User:r})=>o(f,{sx:{display:"flex",p:2},children:[t(O,{user:r,sx:{mr:2}}),o(U,{elevation:1,sx:{px:2,py:1},children:[o(f,{children:[t(v,{variant:"h6",sx:{fontSize:"1.2em"},children:(r==null?void 0:r.firstname)+" "+(r==null?void 0:r.lastname)}),t(v,{sx:{fontSize:"0.7em"},children:te(Ye(e,n)).startOf("second").fromNow()})]}),o(f,{sx:{width:200},children:[t(v,{children:s}),t(R,{data:i})]})]})]}),Qe=({idPost:e})=>{const{commentPost:n,data:s}=h.useContext(V),{data:i,loading:r,refetch:m,fetchMore:g}=_(Q,{variables:{postId:e},notifyOnNetworkStatusChange:!0}),C=H(),x=async l=>{const a=l.files?l:{...l,files:[]};n&&await n(e,a),await m({postId:e})};h.useEffect(()=>{var l;s&&i&&((l=i.getCommentByPost.data)!=null&&l.find(a=>a.User.id===s.getStatusUser.id&&a.User.status!==s.getStatusUser.status))&&C.writeQuery({query:Q,data:{getCommentByPost:{...i.getCommentByPost,data:i.getCommentByPost.data.map(a=>a.User.id===s.getStatusUser.id?{...a,User:s.getStatusUser}:a)}}})},[s,i]);const d=h.useMemo(()=>i==null?void 0:i.getCommentByPost.data,[i]);return o(f,{sx:{width:{xs:"95%",md:500},height:d!=null&&d.length&&d.length>2?300:"max-content",overflowY:"auto",position:"relative"},children:[d==null?void 0:d.map((l,a)=>o(h.Fragment,{children:[t(Ke,{...l},l.id),a===(d==null?void 0:d.length)-1&&(d==null?void 0:d.length)===10&&t(re,{onEnter:()=>g({variables:{cursor:d[d.length-1].id},updateQuery(c,{fetchMoreResult:I}){return I.getCommentByPost.data?{getCommentByPost:{...c.getCommentByPost,data:c.getCommentByPost.data?[...c.getCommentByPost.data,...I.getCommentByPost.data]:[]}}:c}})})]},a)),r&&[1,2,3].map(l=>t(ne,{},l)),t(We,{saveComment:x})]})},Je="/subscription-graphql/assets/angry-d394f93a.svg",Xe="/subscription-graphql/assets/laughing-b7bdfa91.svg",Ze="/subscription-graphql/assets/like-4c97d098.svg",et="/subscription-graphql/assets/sad-9d383dc3.svg",tt="/subscription-graphql/assets/soaked-06ad2e0f.svg",rt="/subscription-graphql/assets/love-43d155c9.svg",de=[{url:Ze,value:w.LIKE},{url:rt,value:w.LOVE},{url:Xe,value:w.HAHA},{url:et,value:w.SAD},{url:tt,value:w.WOAHOU},{url:Je,value:w.GRR}],nt=({btnClicked:e,onClick:n})=>{const s={visible:{opacity:1,transition:{when:"afterChildren",staggerChildren:.2}},hidden:{opacity:0,transition:{when:"beforeChildren"},scale:.6}},i=r=>{const m=r.target.src,g=r.target.alt;n({url:m,value:g})};return t($.div,{className:"parentDiv",children:t($.div,{className:"reactionsHolder",variants:s,animate:e?"visible":"hidden",children:de.map((r,m)=>t($.img,{whileHover:{scale:1.5},src:r.url,alt:r.value,width:"40",onClick:i},m))})})},at="/subscription-graphql/assets/likeicon-a4800f27.png",st=e=>{const n=de.find(s=>s.value===e);return n==null?void 0:n.url},it=({post:e,user:n,addReact:s,onMouseLeave:i,...r})=>{const[m,g]=h.useState(!1),C=xe(),[x,d]=h.useState(!1),l=h.useMemo(()=>{var p;return(p=e==null?void 0:e.reactions)==null?void 0:p.find(b=>b.userId===(n==null?void 0:n.id))},[e,n]),[a,c]=h.useState({url:l?st(l.reactionType):void 0,value:l==null?void 0:l.reactionType}),I=()=>{g(p=>!p)},S=async p=>{p.value&&(c(b=>b.value===p.value?{url:void 0,value:void 0}:p),await s(e==null?void 0:e.id,{reactionType:p.value}))},u=h.useMemo(()=>{var b,G,W;return(n==null?void 0:n.id)===((b=e==null?void 0:e.user)==null?void 0:b.id)?"Vous":((G=e==null?void 0:e.user)==null?void 0:G.firstname)+" "+((W=e==null?void 0:e.user)==null?void 0:W.lastname)},[n,e]);return o(f,{children:[o(U,{elevation:1,...r,onMouseLeave:p=>{i&&i(p),d(!1)},children:[t(ve,{avatar:t(O,{user:e.user}),title:o(Z,{children:[t(v,{onClick:()=>C(`/subscription-graphql/landing/profil/${e.user.id}`),variant:"h5",sx:{cursor:"pointer"},children:u}),t(v,{children:te(new Date((e==null?void 0:e.updatedAt)||(e==null?void 0:e.createdAt))).startOf("second").fromNow()})]})}),o(ye,{children:[t(v,{children:e.description}),t(R,{data:e.files})]}),t(nt,{btnClicked:x,onClick:S}),t(be,{children:o(F,{container:!0,sx:{position:"relative"},children:[t(F,{item:!0,xs:6,sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:t($.button,{className:"likeBtn",style:{background:"transparent"},onMouseEnter:()=>d(!0),children:t($.img,{src:(a==null?void 0:a.url)||at,width:a!=null&&a.url?"27":"15"})})}),o(F,{item:!0,xs:6,sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:[t(k,{onClick:I,children:t(ie,{})}),t(v,{children:e.nbComments})]})]})})]}),m&&t(Qe,{idPost:e.id})]})},ot=()=>{const{user:e}=D(),{data:n,loading:s,error:i}=_(qe,{variables:{userId:e==null?void 0:e.id},skip:!(e!=null&&e.id)}),[r]=A(Ee);return{data:n,loading:s,error:i,createPost:async(g,C)=>{const x=g.files?g:{...g,files:[]};return await r({variables:{data:x,userId:C}})}}},dt=P`
  mutation AddReaction(
    $reactionType: ReactionInput!
    $userId: Float!
    $postId: Float!
  ) {
    addReaction(reactionType: $reactionType, userId: $userId, postId: $postId)
  }
`,ct=()=>{const[e,{error:n}]=A(dt);return{addReact:async(i,r,m)=>{await e({variables:{postId:i,userId:r,reactionType:m}})}}},lt=()=>{const[e,{loading:n,error:s}]=A(Le);return{commentExec:e,loading:n,errorComment:s==null?void 0:s.message}},ut=()=>o(Ie,{spacing:1,sx:{p:2,width:{xs:350,md:500}},children:[o(f,{sx:{display:"flex",alignItems:"center"},children:[t(T,{variant:"circular",width:40,height:40,sx:{mr:1}}),t(T,{variant:"text",sx:{fontSize:"1rem",width:{xs:"80%",md:400}}})]}),t(T,{variant:"rounded",height:100,sx:{width:{xs:"100%",md:500}}})]}),mt=j.memo(({data:e,user:n})=>{const[s,i]=h.useState(null),{data:r,loading:m,fetchMore:g}=_(K,{variables:{userId:n==null?void 0:n.id,status:!0,cursor:null},skip:!(n!=null&&n.id),notifyOnNetworkStatusChange:!0}),C=H(),{dispatchDiscussion:x}=h.useContext(Pe),[d]=A(Se);h.useEffect(()=>{e&&r&&n&&!r.getFriendOfCurrentUser.find(a=>a.id===e.getStatusUser.id&&a.status===e.getStatusUser.status)&&C.writeQuery({query:K,variables:{userId:n.id,status:!0,cursor:s},data:{getFriendOfCurrentUser:e.getStatusUser.status?[e.getStatusUser,...r.getFriendOfCurrentUser]:r.getFriendOfCurrentUser.filter(a=>a.id!==e.getStatusUser.id)}})},[e,n,r,s]);const l=async a=>{if(!n)return;const{data:c}=await d({variables:{userId:n.id,receiverId:a.id}});c&&x({type:"add discussion",value:{...c.createDiscussion,openMessage:!0,newMessageNbr:0,userDiscuss:we(n,{...c.createDiscussion.User,status:!0},c.createDiscussion.Receiver?{...c.createDiscussion.Receiver,status:!0}:null,c.createDiscussion.DiscussGroup)}})};return o(U,{elevation:1,sx:{position:"fixed",right:"10px",display:{xs:"none",md:"block"},width:"25vw",bottom:"10px",p:1},children:[t(v,{variant:"h3",sx:{textAlign:"center",my:1},children:"Contacts"}),o(f,{sx:{height:"78vh",overflowY:"auto"},children:[r==null?void 0:r.getFriendOfCurrentUser.filter(a=>a.status).map(a=>o(f,{onClick:()=>l(a),sx:{p:1,display:"flex",alignItems:"center",borderRadius:"10px",cursor:"pointer",":hover":{backgroundColor:"lightgray"}},children:[t(O,{user:a}),t(v,{children:a.firstname+" "+a.lastname})]},a.id)),r&&r.getFriendOfCurrentUser.length>0&&r.getFriendOfCurrentUser.length%10===0&&o(f,{onClick:()=>{i(r.getFriendOfCurrentUser[r.getFriendOfCurrentUser.length-1].id),g({variables:{userId:n==null?void 0:n.id,status:!0,cursor:r.getFriendOfCurrentUser[r.getFriendOfCurrentUser.length-1].id},updateQuery:(a,{fetchMoreResult:c})=>c?{getFriendOfCurrentUser:[...a.getFriendOfCurrentUser,...c.getFriendOfCurrentUser]}:a})},sx:{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px",cursor:"pointer",":hover":{backgroundColor:"lightgray"},py:1},children:[t(v,{children:"Afficher plus"}),t($e,{})]})]}),m&&[1,2,3].map(a=>t(ne,{},a))]})}),ht=P`
  subscription GetStatusUser($userId: Float!) {
    getStatusUser(userId: $userId) {
      status
      lastname
      firstname
      id
      photo
    }
  }
`,V=h.createContext({});function gt(){const{allPost:e,postLoading:n,refetch:s,fetchMore:i}=Be(),{user:r}=D(),{createPost:m}=ot(),{addReact:g}=ct(),{commentExec:C,loading:x,errorComment:d}=lt(),l=H(),a=h.useCallback(async(u,y)=>{await g(u,r==null?void 0:r.id,y),await s()},[r]),{data:c}=Oe(ht,{variables:{userId:r==null?void 0:r.id},skip:!(r!=null&&r.id)}),I=h.useCallback(async(u,y)=>{await C({variables:{postId:u,userId:r==null?void 0:r.id,commentInput:y}}),await s()},[r]),S=async(u,y)=>{await m(u,y),await s()};return h.useEffect(()=>{c&&e&&e.getOrderPost.find(u=>u.user.id===c.getStatusUser.id&&u.user.status!==c.getStatusUser.status)&&l.writeQuery({query:se,data:{getOrderPost:e.getOrderPost.map(u=>u.user.id===c.getStatusUser.id?{...u,user:c.getStatusUser}:u)}})},[c,e]),o(F,{container:!0,sx:{alignItems:"center",flexDirection:"column"},children:[t(Te,{createPost:S}),t(V.Provider,{value:{commentPost:I,data:c},children:e==null?void 0:e.getOrderPost.map((u,y)=>o(h.Fragment,{children:[t(it,{user:r,addReact:a,post:u,sx:{p:2,width:{xs:350,md:500},my:1}},u.id),y===(e==null?void 0:e.getOrderPost.length)-1&&e.getOrderPost.length===10&&t(re,{onEnter:()=>i({variables:{cursor:e==null?void 0:e.getOrderPost[e.getOrderPost.length-1].id},updateQuery(p,{fetchMoreResult:b}){return b?{getOrderPost:[...p.getOrderPost,...b.getOrderPost]}:p}})})]},u.id))}),n&&[1,2,3,4].map(u=>t(ut,{},u)),t(mt,{data:c,user:r})]})}const Ct=Object.freeze(Object.defineProperty({__proto__:null,CommentContext:V,default:gt},Symbol.toStringTag,{value:"Module"}));export{V as C,ht as G,Ct as L,qe as P,ct as a,lt as b,Te as c,it as d,ut as e,ot as u};
