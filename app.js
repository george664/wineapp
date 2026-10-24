(function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lang='en';
const I={en:{
nav_dash:'Dashboard',nav_sup:'Suppliers',nav_cli:'Accounts',nav_ord:'Orders',tag:'Private import, Quebec',sample:'Example data. Changes are saved and shared.',theme:'Light / dark',
dash_t:'This week',k_sales:'Sales this month',k_sales_s:'before tax, month to date',k_ar:'To collect',k_ar_s:'{n} past due',k_ar_0:'nothing past due',k_del:'To deliver',k_del_s:'{n} confirmed orders',k_inc:'Cases on the way',k_inc_s:'{n} shipments',
s_del:'Upcoming deliveries',s_ship:'Supplier shipments',s_att:'Needs attention',s_sales:'Sales by month, before tax',none_del:'No confirmed orders waiting.',none_att:'Nothing needs attention.',cur_m:'month to date',
cases:'cases',btl:'btl',
al_pexp:'{name}: permit expired {n} days ago. Orders cannot be confirmed.',al_psoon:'{name}: permit expires in {n} days.',al_over:'{name}: {amt} past due since {date}.',al_quiet:'{name}: no order in {n} days.',al_out:'{name}: out of stock, {n} cases on the way.',al_out0:'{name}: out of stock.',al_low:'{name}: {n} cases left.',
sup_t:'Suppliers',sup_s:'Estates and cooperatives you import from.',new_sup:'New supplier',c_supplier:'Supplier',c_contact:'Contact',c_terms:'Terms',c_lead:'Lead time',c_wines:'Wines',c_next:'Next arrival',wk:'{n} wk',
acc_t:'Accounts',acc_s:'Restaurants, grocers, wine shops and inns you sell to.',new_acc:'New account',search:'Search name, city or contact',all:'All',c_client:'Account',c_type:'Type',c_last:'Last order',c_vol:'Sales, 12 mo.',c_permit:'Permit',c_status:'Status',never:'No orders yet',
ord_t:'Orders',ord_s:'From draft to payment.',new_ord:'New order',c_order:'Order',c_placed:'Placed',c_deliv:'Delivery',c_cases:'Cases',c_total:'Total with tax',
ty_resto:'Restaurant',ty_epicerie:'Grocery',ty_caviste:'Wine shop',ty_hotel:'Hotel or inn',
st_active:'Active',st_followup:'Follow up',st_prospect:'Prospect',os_draft:'Draft',os_confirmed:'Confirmed',os_delivered:'Delivered',os_paid:'Paid',
sh_production:'In production',sh_sea:'At sea',sh_customs:'In customs',sh_received:'Received',
co_red:'Red',co_white:'White',co_rose:'Rosé',co_fortified:'Fortified',
tm_net15:'Net 15',tm_net30:'Net 30',tm_cod:'Cash on delivery',
p_ok:'Valid until {date}',p_soon:'Expires in {n} days',p_exp:'Expired {n} days ago',p_none:'No permit on file',
permit_no:'Permit no.',terms:'Payment terms',dnote:'Delivery notes',contact:'Contact',since:'Customer since {y}',top:'Most ordered wines',hist:'Order history',wines:'Wines',ships:'Shipments',stock:'In stock',transit:'On the way',margin:'Margin',notes:'Notes',
wine:'Wine',qty:'Cases',bottles:'Bottles',unit:'Price / btl',amt:'Amount',sub:'Subtotal',tps:'GST 5%',tvq:'QST 9.975%',total:'Total',gm:'Gross margin',
adv_confirmed:'Confirm order',adv_delivered:'Mark delivered',adv_paid:'Mark paid',due:'Due {date}',placed_on:'Placed {date}',deliver_on:'Delivery {date}',
acc:'Account',dl:'Delivery date',add_line:'Add a wine',pick:'Select an account',pickw:'Select a wine',save_draft:'Save draft',cancel:'Cancel',permit_block:'This permit has expired. You can save a draft but not confirm.',stock_warn:'Only {n} in stock',
f_name:'Name',f_type:'Type',f_city:'City',f_area:'Area',f_contact:'Contact person',f_email:'Email',f_pno:'Permit number',f_pexp:'Permit expiry',f_terms:'Payment terms',f_country:'Country',f_region:'Region',f_lead:'Lead time (weeks)',f_pay:'Terms',save:'Save',req:'Name is required.',
t_acc:'Account added',t_sup:'Supplier added',t_ord:'Order {id} saved',t_st:'Order {id}: {s}',close:'Close',rm:'Remove line',none:'None',loading:'Loading your data…',nodb:'Sign in to claude.ai to see and edit this data.',t_err:'Could not save. The change was undone.',login_t:'Sign in',login_s:'Use the email and password your administrator created for you.',email:'Email',password:'Password',sign_in:'Sign in',sign_out:'Sign out',login_err:'Email or password is incorrect.',demo:'Demo mode. Changes are not saved.',load_err:'Could not load data: {m}'},
fr:{
nav_dash:'Tableau de bord',nav_sup:'Fournisseurs',nav_cli:'Clients',nav_ord:'Commandes',tag:'Importation privée, Québec',sample:'Données d’exemple. Rien n’est enregistré.',theme:'Clair / sombre',
dash_t:'Cette semaine',k_sales:'Ventes du mois',k_sales_s:'avant taxes, à ce jour',k_ar:'À encaisser',k_ar_s:'{n} en retard',k_ar_0:'aucun retard',k_del:'À livrer',k_del_s:'{n} commandes confirmées',k_inc:'Caisses en route',k_inc_s:'{n} arrivages',
s_del:'Prochaines livraisons',s_ship:'Arrivages des fournisseurs',s_att:'À surveiller',s_sales:'Ventes par mois, avant taxes',none_del:'Aucune commande confirmée en attente.',none_att:'Rien à signaler.',cur_m:'à ce jour',
cases:'caisses',btl:'btl',
al_pexp:'{name} : permis expiré depuis {n} jours. Les commandes ne peuvent pas être confirmées.',al_psoon:'{name} : le permis expire dans {n} jours.',al_over:'{name} : {amt} en retard depuis le {date}.',al_quiet:'{name} : aucune commande depuis {n} jours.',al_out:'{name} : rupture de stock, {n} caisses en route.',al_out0:'{name} : rupture de stock.',al_low:'{name} : il reste {n} caisses.',
sup_t:'Fournisseurs',sup_s:'Domaines et coopératives dont vous importez.',new_sup:'Nouveau fournisseur',c_supplier:'Fournisseur',c_contact:'Contact',c_terms:'Conditions',c_lead:'Délai',c_wines:'Vins',c_next:'Prochain arrivage',wk:'{n} sem.',
acc_t:'Clients',acc_s:'Restaurants, épiceries, cavistes et auberges que vous servez.',new_acc:'Nouveau client',search:'Rechercher nom, ville ou contact',all:'Tous',c_client:'Client',c_type:'Type',c_last:'Dernière commande',c_vol:'Ventes, 12 mois',c_permit:'Permis',c_status:'Statut',never:'Aucune commande',
ord_t:'Commandes',ord_s:'Du brouillon au paiement.',new_ord:'Nouvelle commande',c_order:'Commande',c_placed:'Passée',c_deliv:'Livraison',c_cases:'Caisses',c_total:'Total avec taxes',
ty_resto:'Restaurant',ty_epicerie:'Épicerie',ty_caviste:'Caviste',ty_hotel:'Hôtel ou auberge',
st_active:'Actif',st_followup:'À relancer',st_prospect:'Prospect',os_draft:'Brouillon',os_confirmed:'Confirmée',os_delivered:'Livrée',os_paid:'Payée',
sh_production:'En production',sh_sea:'En mer',sh_customs:'Au dédouanement',sh_received:'Reçu',
co_red:'Rouge',co_white:'Blanc',co_rose:'Rosé',co_fortified:'Fortifié',
tm_net15:'Net 15',tm_net30:'Net 30',tm_cod:'Paiement à la livraison',
p_ok:'Valide jusqu’au {date}',p_soon:'Expire dans {n} jours',p_exp:'Expiré depuis {n} jours',p_none:'Aucun permis au dossier',
permit_no:'N° de permis',terms:'Conditions de paiement',dnote:'Notes de livraison',contact:'Contact',since:'Client depuis {y}',top:'Vins les plus commandés',hist:'Historique des commandes',wines:'Vins',ships:'Arrivages',stock:'En stock',transit:'En route',margin:'Marge',notes:'Notes',
wine:'Vin',qty:'Caisses',bottles:'Bouteilles',unit:'Prix / btl',amt:'Montant',sub:'Sous-total',tps:'TPS 5 %',tvq:'TVQ 9,975 %',total:'Total',gm:'Marge brute',
adv_confirmed:'Confirmer la commande',adv_delivered:'Marquer livrée',adv_paid:'Marquer payée',due:'Échéance {date}',placed_on:'Passée le {date}',deliver_on:'Livraison le {date}',
acc:'Client',dl:'Date de livraison',add_line:'Ajouter un vin',pick:'Choisir un client',pickw:'Choisir un vin',save_draft:'Enregistrer le brouillon',cancel:'Annuler',permit_block:'Ce permis est expiré. Vous pouvez enregistrer un brouillon, mais pas confirmer.',stock_warn:'Seulement {n} en stock',
f_name:'Nom',f_type:'Type',f_city:'Ville',f_area:'Secteur',f_contact:'Personne-ressource',f_email:'Courriel',f_pno:'N° de permis',f_pexp:'Expiration du permis',f_terms:'Conditions de paiement',f_country:'Pays',f_region:'Région',f_lead:'Délai (semaines)',f_pay:'Conditions',save:'Enregistrer',req:'Le nom est obligatoire.',
t_acc:'Client ajouté',t_sup:'Fournisseur ajouté',t_ord:'Commande {id} enregistrée',t_st:'Commande {id} : {s}',close:'Fermer',rm:'Retirer la ligne',none:'Aucun',loading:'Chargement des données…',nodb:'Connectez-vous à claude.ai pour voir et modifier ces données.',t_err:'Enregistrement impossible. La modification a été annulée.',login_t:'Connexion',login_s:'Utilisez le courriel et le mot de passe créés par votre administrateur.',email:'Courriel',password:'Mot de passe',sign_in:'Se connecter',sign_out:'Se déconnecter',login_err:'Courriel ou mot de passe incorrect.',demo:'Mode démo. Les changements ne sont pas enregistrés.',load_err:'Impossible de charger les données : {m}'}};
const t=(k,p)=>{let s=(I[lang][k]!=null?I[lang][k]:(I.en[k]!=null?I.en[k]:k));if(p)for(const x in p)s=s.split('{'+x+'}').join(p[x]);return s;};
const L=o=>typeof o==='string'?o:(o[lang]||o.fr||o.en||'');
const base=new Date();base.setHours(12,0,0,0);
const off=n=>{const x=new Date(base);x.setDate(x.getDate()+n);return x;};
const dayDiff=(a,b)=>Math.round((a-b)/86400000);
const loc=()=>lang==='fr'?'fr-CA':'en-CA';
const fmtD=(d,o)=>new Intl.DateTimeFormat(loc(),o||{day:'numeric',month:'short'}).format(d);
const rel=n=>new Intl.RelativeTimeFormat(loc(),{numeric:'auto'}).format(n,'day');
const money=n=>new Intl.NumberFormat(loc(),{style:'currency',currency:'CAD'}).format(n);
const kfmt=v=>new Intl.NumberFormat(loc(),{maximumFractionDigits:1}).format(v/1000)+' k$';
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const parseISO=s=>new Date(s+'T12:00:00');
const TPS=0.05,TVQ=0.09975;

let suppliers=[],wines=[],shipments=[],accounts=[],orders=[],seedMonthly=[];
const WC={red:'#7A1E2E',white:'#D9C86B',rose:'#E8A0A8',fortified:'#8A4B1F'};
const W=id=>wines.find(w=>w.id===id),S=id=>suppliers.find(s=>s.id===id),A=id=>accounts.find(a=>a.id===id),O=id=>orders.find(o=>o.id===id);
const units=l=>l.c*W(l.w).cs;
const oSub=o=>o.lines.reduce((s,l)=>s+units(l)*W(l.w).price,0);
const oCost=o=>o.lines.reduce((s,l)=>s+units(l)*W(l.w).cost,0);
const oCases=o=>o.lines.reduce((s,l)=>s+l.c,0);
const oTotal=o=>oSub(o)*(1+TPS+TVQ);
const termDays=a=>({net15:15,net30:30,cod:0}[a.terms]||0);
const dueDate=o=>{const d=new Date(o.deliver);d.setDate(d.getDate()+termDays(A(o.acc)));return d;};
const isOverdue=o=>o.status==='delivered'&&dayDiff(base,dueDate(o))>0;
const live=a=>orders.filter(o=>o.acc===a.id&&o.status!=='draft');
const lastOrder=a=>{const l=live(a);return l.length?new Date(Math.max(...l.map(o=>o.date))):null;};
const accStatus=a=>{const lo=lastOrder(a);if(!lo)return'prospect';return dayDiff(base,lo)>40?'followup':'active';};
const permitState=a=>{if(!a.pexp)return{k:'none'};const n=dayDiff(a.pexp,base);return n<0?{k:'expired',n:-n}:n<=30?{k:'soon',n}:{k:'ok',n};};
const vol12=a=>live(a).reduce((s,o)=>s+oSub(o),0);

const ui={state:'loading',view:'dash',drawer:null,modal:null,accF:'all',accQ:'',ordF:'all'};
const app=$('#app');
app.innerHTML='<div class="shell"><aside class="side"><div class="side-in" id="side"></div></aside><main class="main" id="view"></main></div><div id="layer"></div><div id="toast" class="toast" role="status" hidden></div>';
let toastT;
const toast=m=>{const e=$('#toast');e.textContent=m;e.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>{e.hidden=true;},2600);};
const pill=(k,x)=>'<span class="pill '+k+'">'+esc(x)+'</span>';
const ordPill=s=>pill({draft:'',confirmed:'info',delivered:'warn',paid:'good'}[s],t('os_'+s));
const shPill=s=>pill({production:'',sea:'info',customs:'warn',received:'good'}[s],t('sh_'+s));
const stPill=s=>pill({active:'good',followup:'warn',prospect:''}[s],t('st_'+s));
const permitPill=a=>{const p=permitState(a);
  if(p.k==='ok')return pill('good',t('p_ok',{date:fmtD(a.pexp,{day:'numeric',month:'short',year:'numeric'})}));
  if(p.k==='soon')return pill('warn',t('p_soon',{n:p.n}));
  if(p.k==='expired')return pill('bad',t('p_exp',{n:p.n}));
  return pill('',t('p_none'));};
const wdot=w=>'<i class="wdot" style="background:'+WC[w.color]+'"></i>';
const wlabel=w=>w.name+(w.vint?' '+w.vint:'');
const hdr=(title,sub,act)=>'<div class="hdr"><div><h1>'+esc(title)+'</h1><div class="hsub">'+esc(sub)+'</div></div>'+(act||'')+'</div>';
const chips=(items,cur,act)=>'<div class="chips" role="group">'+items.map(([k,l])=>'<button data-act="'+act+'" data-id="'+k+'" aria-pressed="'+(k===cur)+'" class="'+(k===cur?'on':'')+'">'+esc(l)+'</button>').join('')+'</div>';
const nextShip=s=>shipments.filter(x=>x.sup===s.id&&x.status!=='received').sort((a,b)=>a.eta-b.eta)[0];

function renderSide(){
  const open=orders.filter(o=>o.status==='draft'||o.status==='confirmed').length;
  const items=[['dash',t('nav_dash'),''],['sup',t('nav_sup'),suppliers.length],['cli',t('nav_cli'),accounts.length],['ord',t('nav_ord'),open]];
  $('#side').innerHTML='<div class="brand"><span class="brand-name">Arrivage</span><span class="brand-tag">'+esc(t('tag'))+'</span></div>'
   +'<nav class="nav" aria-label="Main">'+items.map(([k,l,n])=>'<button data-act="nav" data-id="'+k+'" class="'+(ui.view===k?'on':'')+'" '+(ui.view===k?'aria-current="page"':'')+'><span>'+esc(l)+'</span><span class="n">'+n+'</span></button>').join('')+'</nav>'
   +'<div class="ctl"><div class="seg" role="group" aria-label="Language"><button data-act="lang" data-id="en" aria-pressed="'+(lang==='en')+'">EN</button><button data-act="lang" data-id="fr" aria-pressed="'+(lang==='fr')+'">FR</button></div>'
   +'<button class="lnk" data-act="theme">'+esc(t('theme'))+'</button>'+(mode==='sb'&&ui.user?'<span>'+esc(ui.user)+'</span><button class="lnk" data-act="signout">'+esc(t('sign_out'))+'</button>':'<span>'+esc(t('demo'))+'</span>')+'</div>';
}

function chartSVG(vals){
  const Wd=520,H=210,l=46,r=8,tp=24,b=28,ph=H-tp-b,pw=Wd-l-r;
  const mx=Math.max(...vals),step=5000,top=Math.ceil(mx/step)*step||step;
  const y=v=>tp+ph-(v/top)*ph;
  let g='',i;
  for(let v=0;v<=top;v+=step){g+='<line x1="'+l+'" x2="'+(Wd-r)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="var(--line)" stroke-width="1"/><text class="ct" x="'+(l-6)+'" y="'+(y(v)+4)+'" text-anchor="end">'+kfmt(v)+'</text>';}
  const slot=pw/vals.length,bw=slot*0.56;
  vals.forEach((v,k)=>{
    const d=new Date(base.getFullYear(),base.getMonth()-(vals.length-1-k),1);
    const x=l+slot*k+(slot-bw)/2,cur=k===vals.length-1;
    g+='<rect x="'+x+'" y="'+y(v)+'" width="'+bw+'" height="'+(tp+ph-y(v))+'" rx="2" fill="'+(cur?'var(--accent)':'var(--bar)')+'"/>'
      +'<text class="cv" x="'+(x+bw/2)+'" y="'+(y(v)-6)+'" text-anchor="middle">'+kfmt(v)+'</text>'
      +'<text class="ct" x="'+(x+bw/2)+'" y="'+(H-9)+'" text-anchor="middle">'+esc(fmtD(d,{month:'short'}))+'</text>';
  });
  return '<svg viewBox="0 0 '+Wd+' '+H+'" width="100%" role="img" aria-label="'+esc(t('s_sales'))+'">'+g+'</svg>';
}

function alerts(){
  const out=[];
  accounts.forEach(a=>{const p=permitState(a);
    if(p.k==='expired')out.push({sev:'bad',txt:t('al_pexp',{name:a.name,n:p.n}),act:'open-acc',id:a.id});
    else if(p.k==='soon')out.push({sev:'warn',txt:t('al_psoon',{name:a.name,n:p.n}),act:'open-acc',id:a.id});});
  orders.filter(isOverdue).forEach(o=>out.push({sev:'bad',txt:t('al_over',{name:A(o.acc).name,amt:money(oTotal(o)),date:fmtD(dueDate(o))}),act:'open-ord',id:o.id}));
  accounts.forEach(a=>{if(accStatus(a)==='followup')out.push({sev:'warn',txt:t('al_quiet',{name:a.name,n:dayDiff(base,lastOrder(a))}),act:'open-acc',id:a.id});});
  wines.forEach(w=>{
    if(w.stock===0)out.push({sev:'bad',txt:w.transit?t('al_out',{name:wlabel(w),n:w.transit}):t('al_out0',{name:wlabel(w)}),act:'open-sup',id:w.sup});
    else if(w.stock<10)out.push({sev:'warn',txt:t('al_low',{name:wlabel(w),n:w.stock}),act:'open-sup',id:w.sup});});
  return out.sort((a,b)=>(a.sev==='bad'?0:1)-(b.sev==='bad'?0:1));
}

function vDash(){
  const lv=orders.filter(o=>o.status!=='draft');
  const mtd=lv.filter(o=>o.date.getMonth()===base.getMonth()&&o.date.getFullYear()===base.getFullYear()).reduce((s,o)=>s+oSub(o),0);
  const unpaid=orders.filter(o=>o.status==='delivered'),ar=unpaid.reduce((s,o)=>s+oTotal(o),0),od=unpaid.filter(isOverdue).length;
  const conf=orders.filter(o=>o.status==='confirmed').sort((a,b)=>a.deliver-b.deliver);
  const inc=shipments.filter(x=>x.status!=='received'),incCases=inc.reduce((s,x)=>s+x.cases,0);
  const al=alerts();
  const kpi=(l,v,s,neg)=>'<div class="kpi"><h3>'+esc(l)+'</h3><div class="v">'+esc(v)+'</div><div class="s'+(neg?' neg':'')+'">'+esc(s)+'</div></div>';
  const dels=conf.length?conf.map(o=>{const a=A(o.acc);return '<button class="row" data-act="open-ord" data-id="'+o.id+'"><span class="dchip"><b>'+o.deliver.getDate()+'</b><span>'+esc(fmtD(o.deliver,{month:'short'}))+'</span></span><span><span class="t">'+esc(a.name)+'</span><br><span class="sub">'+esc(a.city+', '+a.area)+'</span></span><span class="r">'+money(oSub(o))+'<br><span class="sub">'+oCases(o)+' '+esc(t('cases'))+'</span></span></button>';}).join(''):'<div class="empty">'+esc(t('none_del'))+'</div>';
  const ships=shipments.slice().sort((a,b)=>(a.status==='received')-(b.status==='received')||a.eta-b.eta).map(x=>'<button class="row" data-act="open-sup" data-id="'+x.sup+'"><span>'+shPill(x.status)+'</span><span><span class="t">'+esc(S(x.sup).name)+'</span><br><span class="sub"><span class="mono">'+esc(x.ref)+'</span> · '+x.cases+' '+esc(t('cases'))+'</span></span><span class="r">'+esc(fmtD(x.eta))+'<br><span class="sub">'+esc(rel(dayDiff(x.eta,base)))+'</span></span></button>').join('');
  const als=al.length?al.map(a=>'<button class="row alert" data-act="'+a.act+'" data-id="'+a.id+'"><span class="dot '+a.sev+'"></span><span>'+esc(a.txt)+'</span></button>').join(''):'<div class="empty">'+esc(t('none_att'))+'</div>';
  return hdr(t('dash_t'),fmtD(base,{weekday:'long',day:'numeric',month:'long',year:'numeric'}))
   +'<div class="kpis">'+kpi(t('k_sales'),money(mtd),t('k_sales_s'))+kpi(t('k_ar'),money(ar),od?t('k_ar_s',{n:od}):t('k_ar_0'),od>0)+kpi(t('k_del'),conf.reduce((s,o)=>s+oCases(o),0)+' '+t('cases'),t('k_del_s',{n:conf.length}))+kpi(t('k_inc'),incCases+' '+t('cases'),t('k_inc_s',{n:inc.length}))+'</div>'
   +'<div class="grid"><section class="panel"><div class="ph"><h3>'+esc(t('s_del'))+'</h3></div>'+dels+'</section><section class="panel"><div class="ph"><h3>'+esc(t('s_ship'))+'</h3></div>'+ships+'</section></div>'
   +'<div class="grid"><section class="panel"><div class="ph"><h3>'+esc(t('s_att'))+'</h3></div>'+als+'</section><section class="panel"><div class="ph"><h3>'+esc(t('s_sales'))+'</h3></div><div style="padding:0 16px 14px">'+chartSVG(seedMonthly.concat([mtd]))+'<div class="sub">'+esc(fmtD(base,{month:'long'}))+': '+esc(t('cur_m'))+'</div></div></section></div>';
}

function vSup(){
  const rows=suppliers.map(s=>{const n=nextShip(s);return '<tr class="click" tabindex="0" data-act="open-sup" data-id="'+s.id+'"><td><div class="t">'+esc(s.name)+'</div><div class="sub">'+esc(s.region+', '+s.country)+'</div></td><td>'+esc(s.contact)+'</td><td>'+esc(s.terms)+'</td><td class="num">'+esc(t('wk',{n:s.lead}))+'</td><td class="num">'+wines.filter(w=>w.sup===s.id).length+'</td><td>'+(n?esc(fmtD(n.eta))+' '+shPill(n.status):'<span class="sub">—</span>')+'</td></tr>';}).join('');
  return hdr(t('sup_t'),t('sup_s'),'<button class="btn primary" data-act="new-sup">'+esc(t('new_sup'))+'</button>')
   +'<div class="panel tw"><table><thead><tr><th>'+esc(t('c_supplier'))+'</th><th>'+esc(t('c_contact'))+'</th><th>'+esc(t('c_terms'))+'</th><th class="num">'+esc(t('c_lead'))+'</th><th class="num">'+esc(t('c_wines'))+'</th><th>'+esc(t('c_next'))+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}

function accRows(){
  const q=ui.accQ.trim().toLowerCase();
  const list=accounts.filter(a=>(ui.accF==='all'||a.type===ui.accF)&&(!q||(a.name+' '+a.city+' '+a.area+' '+a.contact).toLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name));
  return list.map(a=>{const lo=lastOrder(a),p=permitState(a);
    const perm=p.k==='ok'?'<span class="sub">'+esc(fmtD(a.pexp,{day:'numeric',month:'short',year:'numeric'}))+'</span>':permitPill(a);
    return '<tr class="click" tabindex="0" data-act="open-acc" data-id="'+a.id+'"><td><div class="t">'+esc(a.name)+'</div><div class="sub">'+esc(a.city+', '+a.area)+'</div></td><td>'+esc(t('ty_'+a.type))+'</td><td>'+(lo?esc(rel(-dayDiff(base,lo))):'<span class="sub">'+esc(t('never'))+'</span>')+'</td><td class="num">'+(vol12(a)?money(vol12(a)):'—')+'</td><td>'+perm+'</td><td>'+stPill(accStatus(a))+'</td></tr>';}).join('');
}
function vAcc(){
  const f=[['all',t('all')],['resto',t('ty_resto')],['epicerie',t('ty_epicerie')],['caviste',t('ty_caviste')],['hotel',t('ty_hotel')]];
  return hdr(t('acc_t'),t('acc_s'),'<button class="btn primary" data-act="new-acc">'+esc(t('new_acc'))+'</button>')
   +'<div class="tools"><input type="search" id="accQ" placeholder="'+esc(t('search'))+'" aria-label="'+esc(t('search'))+'" value="'+esc(ui.accQ)+'">'+chips(f,ui.accF,'acc-f')+'</div>'
   +'<div class="panel tw"><table><thead><tr><th>'+esc(t('c_client'))+'</th><th>'+esc(t('c_type'))+'</th><th>'+esc(t('c_last'))+'</th><th class="num">'+esc(t('c_vol'))+'</th><th>'+esc(t('c_permit'))+'</th><th>'+esc(t('c_status'))+'</th></tr></thead><tbody id="accRows">'+accRows()+'</tbody></table></div>';
}

function vOrd(){
  const keys=['all','draft','confirmed','delivered','paid'];
  const f=keys.map(k=>[k,(k==='all'?t('all'):t('os_'+k))+' '+(k==='all'?orders.length:orders.filter(o=>o.status===k).length)]);
  const list=orders.filter(o=>ui.ordF==='all'||o.status===ui.ordF).sort((a,b)=>b.date-a.date||b.id.localeCompare(a.id));
  const rows=list.map(o=>{const a=A(o.acc),od=isOverdue(o);
    return '<tr class="click" tabindex="0" data-act="open-ord" data-id="'+o.id+'"><td class="mono">'+esc(o.id)+'</td><td><div class="t">'+esc(a.name)+'</div><div class="sub">'+esc(a.city)+'</div></td><td>'+esc(fmtD(o.date))+'</td><td>'+esc(fmtD(o.deliver))+'</td><td class="num">'+oCases(o)+'</td><td class="num">'+money(oTotal(o))+'</td><td>'+ordPill(o.status)+(o.status==='delivered'?'<div class="sub" style="'+(od?'color:var(--bad)':'')+'">'+esc(t('due',{date:fmtD(dueDate(o))}))+'</div>':'')+'</td></tr>';}).join('');
  return hdr(t('ord_t'),t('ord_s'),'<button class="btn primary" data-act="new-ord">'+esc(t('new_ord'))+'</button>')
   +'<div class="tools">'+chips(f,ui.ordF,'ord-f')+'</div>'
   +'<div class="panel tw"><table><thead><tr><th>'+esc(t('c_order'))+'</th><th>'+esc(t('c_client'))+'</th><th>'+esc(t('c_placed'))+'</th><th>'+esc(t('c_deliv'))+'</th><th class="num">'+esc(t('c_cases'))+'</th><th class="num">'+esc(t('c_total'))+'</th><th>'+esc(t('c_status'))+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function renderView(){
  const v=$('#view');
  if(ui.state==='ready'){v.innerHTML={dash:vDash,sup:vSup,cli:vAcc,ord:vOrd}[ui.view]();return;}
  if(ui.state==='login'){v.innerHTML=hdr(t('login_t'),t('login_s'))+'<form class="login" id="loginForm" novalidate><div class="fld"><label for="lg-email">'+esc(t('email'))+'</label><input id="lg-email" type="email" autocomplete="username" required></div><div class="fld"><label for="lg-pass">'+esc(t('password'))+'</label><input id="lg-pass" type="password" autocomplete="current-password" required></div><div class="err" id="lg-err">'+esc(ui.loginErr||'')+'</div><button class="btn primary" type="submit">'+esc(t('sign_in'))+'</button></form>';return;}
  const msg=ui.state==='error'?t('load_err',{m:ui.err||''}):t(ui.state==='nodb'?'nodb':'loading');
  v.innerHTML='<div class="empty" style="border:0">'+esc(msg)+'</div>';
}

const X='<button class="x" data-act="close" aria-label="'+'CLOSE'+'">×</button>';
const closeBtn=()=>X.replace('CLOSE',esc(t('close')));
const dd=(k,v)=>'<div><dt>'+esc(k)+'</dt><dd>'+v+'</dd></div>';
const totalsHTML=sub=>'<div class="tot"><span>'+esc(t('sub'))+'</span><span>'+money(sub)+'</span><span>'+esc(t('tps'))+'</span><span>'+money(sub*TPS)+'</span><span>'+esc(t('tvq'))+'</span><span>'+money(sub*TVQ)+'</span><span class="big">'+esc(t('total'))+'</span><span class="big">'+money(sub*(1+TPS+TVQ))+'</span></div>';

function dAcc(a){
  const ords=orders.filter(o=>o.acc===a.id).sort((x,y)=>y.date-x.date);
  const tally={};live(a).forEach(o=>o.lines.forEach(l=>{tally[l.w]=(tally[l.w]||0)+l.c;}));
  const top=Object.entries(tally).sort((x,y)=>y[1]-x[1]).slice(0,3);
  return '<div class="dh"><div><h2>'+esc(a.name)+'</h2><div class="sub">'+esc(t('ty_'+a.type)+' · '+a.city+', '+a.area)+'</div></div>'+closeBtn()+'</div>'
   +'<div class="pills">'+stPill(accStatus(a))+permitPill(a)+'</div>'
   +'<dl class="dl">'+dd(t('contact'),esc(a.contact)+'<br><span class="sub">'+esc(a.email)+'</span>')+dd(t('permit_no'),'<span class="mono">'+esc(a.pno||'—')+'</span>')+dd(t('terms'),esc(t('tm_'+a.terms)))+dd(t('c_vol'),vol12(a)?money(vol12(a)):'—')+'</dl>'
   +'<div class="sec"><h3>'+esc(t('dnote'))+'</h3><div>'+esc(L(a.note))+'</div><div class="sub">'+esc(t('since',{y:a.since}))+'</div></div>'
   +(top.length?'<div class="sec"><h3>'+esc(t('top'))+'</h3><div class="panel">'+top.map(([w,c])=>'<div class="row" style="cursor:default;grid-template-columns:minmax(0,1fr) auto"><span class="t">'+wdot(W(w))+esc(wlabel(W(w)))+'</span><span class="r">'+c+' '+esc(t('cases'))+'</span></div>').join('')+'</div></div>':'')
   +'<div class="sec"><h3>'+esc(t('hist'))+'</h3>'+(ords.length?'<div class="panel">'+ords.map(o=>'<button class="row" data-act="open-ord" data-id="'+o.id+'"><span class="mono">'+esc(o.id)+'</span><span>'+ordPill(o.status)+' <span class="sub">'+esc(fmtD(o.date))+'</span></span><span class="r">'+money(oTotal(o))+'</span></button>').join('')+'</div>':'<div class="sub">'+esc(t('never'))+'</div>')+'</div>'
   +'<div class="acts"><button class="btn primary" data-act="new-ord" data-id="'+a.id+'">'+esc(t('new_ord'))+'</button></div>';
}

function dSup(s){
  const ws=wines.filter(w=>w.sup===s.id),sh=shipments.filter(x=>x.sup===s.id).sort((a,b)=>b.eta-a.eta);
  return '<div class="dh"><div><h2>'+esc(s.name)+'</h2><div class="sub">'+esc(s.region+', '+s.country)+'</div></div>'+closeBtn()+'</div>'
   +'<dl class="dl">'+dd(t('contact'),esc(s.contact)+'<br><span class="sub">'+esc(s.email)+'</span>')+dd(t('c_terms'),esc(s.terms))+dd(t('c_lead'),esc(t('wk',{n:s.lead})))+'</dl>'
   +'<div class="sec"><h3>'+esc(t('notes'))+'</h3><div>'+esc(L(s.note))+'</div></div>'
   +'<div class="sec"><h3>'+esc(t('wines'))+'</h3><div class="panel tw"><table><thead><tr><th>'+esc(t('wine'))+'</th><th class="num">'+esc(t('stock'))+'</th><th class="num">'+esc(t('transit'))+'</th><th class="num">'+esc(t('margin'))+'</th></tr></thead><tbody>'
   +ws.map(w=>'<tr><td>'+wdot(w)+esc(wlabel(w))+'<div class="sub">'+esc(t('co_'+w.color))+' · '+w.cs+' '+esc(t('btl'))+'</div></td><td class="num">'+(w.stock===0?pill('bad','0'):w.stock)+'</td><td class="num">'+(w.transit||'—')+'</td><td class="num">'+Math.round((w.price-w.cost)/w.price*100)+' %</td></tr>').join('')+'</tbody></table></div></div>'
   +'<div class="sec"><h3>'+esc(t('ships'))+'</h3>'+(sh.length?'<div class="panel">'+sh.map(x=>'<div class="row" style="cursor:default"><span>'+shPill(x.status)+'</span><span class="mono">'+esc(x.ref)+' · '+x.cases+' '+esc(t('cases'))+'</span><span class="r">'+esc(fmtD(x.eta))+'</span></div>').join('')+'</div>':'<div class="sub">'+esc(t('none'))+'</div>')+'</div>';
}

function dOrd(o){
  const a=A(o.acc),sub=oSub(o),nxt={draft:'confirmed',confirmed:'delivered',delivered:'paid'}[o.status];
  const blocked=nxt==='confirmed'&&permitState(a).k==='expired';
  return '<div class="dh"><div><h2><span class="mono" style="font-family:var(--font-mono);font-size:18px">'+esc(o.id)+'</span></h2><button class="row" style="padding:2px 0;border:0;display:block;width:auto" data-act="open-acc" data-id="'+a.id+'"><span class="t" style="color:var(--accent-text);text-decoration:underline">'+esc(a.name)+'</span></button></div>'+closeBtn()+'</div>'
   +'<div class="pills">'+ordPill(o.status)+(isOverdue(o)?pill('bad',t('due',{date:fmtD(dueDate(o))})):'')+'</div>'
   +'<dl class="dl">'+dd(t('c_placed'),esc(fmtD(o.date,{day:'numeric',month:'long',year:'numeric'})))+dd(t('c_deliv'),esc(fmtD(o.deliver,{day:'numeric',month:'long',year:'numeric'})))+dd(t('terms'),esc(t('tm_'+a.terms)))+dd(t('gm'),money(sub-oCost(o))+' <span class="sub">('+Math.round((sub-oCost(o))/sub*100)+' %)</span>')+'</dl>'
   +'<div class="panel tw"><table><thead><tr><th>'+esc(t('wine'))+'</th><th class="num">'+esc(t('qty'))+'</th><th class="num">'+esc(t('unit'))+'</th><th class="num">'+esc(t('amt'))+'</th></tr></thead><tbody>'
   +o.lines.map(l=>{const w=W(l.w);return '<tr><td>'+wdot(w)+esc(wlabel(w))+'<div class="sub">'+units(l)+' '+esc(t('btl'))+'</div></td><td class="num">'+l.c+'</td><td class="num">'+money(w.price)+'</td><td class="num">'+money(units(l)*w.price)+'</td></tr>';}).join('')+'</tbody></table></div>'
   +totalsHTML(sub)
   +(blocked?'<div class="note">'+esc(t('permit_block'))+'</div>':'')
   +(nxt?'<div class="acts"><button class="btn primary" data-act="advance" data-id="'+o.id+'" '+(blocked?'disabled':'')+'>'+esc(t('adv_'+nxt))+'</button></div>':'');
}

function renderLayer(){
  const d=ui.drawer,m=ui.modal;let h='';
  if(d&&!({acc:A,sup:S,ord:O}[d.t](d.id)))ui.drawer=null;
  if(ui.drawer){const body=d.t==='acc'?dAcc(A(d.id)):d.t==='sup'?dSup(S(d.id)):dOrd(O(d.id));
    h+='<div class="scrim" data-act="close-bg"></div><aside class="drawer" role="dialog" aria-modal="true">'+body+'</aside>';}
  if(m)h+=m.t==='order'?mOrder(m):mForm(m.t);
  $('#layer').innerHTML=h;
  document.body.style.overflow=(ui.drawer||m)?'hidden':'';
  if(m&&m.t==='order')updateOrder();
}

const fld=(id,label,type,val)=>'<div class="fld"><label for="'+id+'">'+esc(label)+'</label><input id="'+id+'" type="'+(type||'text')+'" value="'+esc(val||'')+'"></div>';
const sel=(id,label,opts)=>'<div class="fld"><label for="'+id+'">'+esc(label)+'</label><select id="'+id+'">'+opts.map(([v,l])=>'<option value="'+v+'">'+esc(l)+'</option>').join('')+'</select></div>';
const modalWrap=(title,body,acts)=>'<div class="modal" data-act="close-bg"><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="mt"><div class="dh"><h2 id="mt">'+esc(title)+'</h2>'+closeBtn()+'</div>'+body+'<div class="acts">'+acts+'</div></div></div>';
function mForm(k){
  if(k==='acc')return modalWrap(t('new_acc'),'<div class="g2">'+fld('fa-name',t('f_name'))+sel('fa-type',t('f_type'),['resto','epicerie','caviste','hotel'].map(x=>[x,t('ty_'+x)]))+fld('fa-city',t('f_city'))+fld('fa-area',t('f_area'))+fld('fa-contact',t('f_contact'))+fld('fa-email',t('f_email'),'email')+fld('fa-pno',t('f_pno'))+fld('fa-pexp',t('f_pexp'),'date')+sel('fa-terms',t('f_terms'),['net30','net15','cod'].map(x=>[x,t('tm_'+x)]))+'</div>','<button class="btn" data-act="close">'+esc(t('cancel'))+'</button><button class="btn primary" data-act="save-acc">'+esc(t('save'))+'</button>');
  return modalWrap(t('new_sup'),'<div class="g2">'+fld('fs-name',t('f_name'))+fld('fs-country',t('f_country'))+fld('fs-region',t('f_region'))+fld('fs-contact',t('f_contact'))+fld('fs-email',t('f_email'),'email')+fld('fs-lead',t('f_lead'),'number','6')+fld('fs-terms',t('f_pay'),'text','Net 30, EUR')+'</div>','<button class="btn" data-act="close">'+esc(t('cancel'))+'</button><button class="btn primary" data-act="save-sup">'+esc(t('save'))+'</button>');
}
const wineOpts=s=>suppliers.map(sp=>'<optgroup label="'+esc(sp.name)+'">'+wines.filter(w=>w.sup===sp.id).map(w=>'<option value="'+w.id+'"'+(w.id===s?' selected':'')+'>'+esc(wlabel(w)+', '+money(w.price))+'</option>').join('')+'</optgroup>').join('');
function mOrder(m){
  const accs=accounts.slice().sort((a,b)=>a.name.localeCompare(b.name));
  const lines=m.lines.map((l,i)=>'<div class="oline"><select id="ow-'+i+'" data-f="wine" data-i="'+i+'" aria-label="'+esc(t('wine'))+'"><option value="">'+esc(t('pickw'))+'</option>'+wineOpts(l.w)+'</select><input id="oq-'+i+'" type="number" min="1" step="1" value="'+l.c+'" data-f="qty" data-i="'+i+'" aria-label="'+esc(t('qty'))+'"><div class="lt" id="lt-'+i+'"></div><button class="x" data-act="rm-line" data-i="'+i+'" aria-label="'+esc(t('rm'))+'">×</button></div><div class="lw" id="lw-'+i+'"></div>').join('');
  const body='<div class="g2"><div class="fld"><label for="oa">'+esc(t('acc'))+'</label><select id="oa" data-f="acc"><option value="">'+esc(t('pick'))+'</option>'+accs.map(a=>'<option value="'+a.id+'"'+(a.id===m.acc?' selected':'')+'>'+esc(a.name+' · '+a.city)+'</option>').join('')+'</select></div><div class="fld"><label for="od">'+esc(t('dl'))+'</label><input id="od" type="date" data-f="deliver" value="'+esc(m.deliver)+'"></div></div>'
   +'<div id="o-note"></div><div class="sec">'+lines+'<div><button class="btn" data-act="add-line">+ '+esc(t('add_line'))+'</button></div></div><div id="o-tot"></div>';
  return modalWrap(t('new_ord'),body,'<button class="btn" data-act="close">'+esc(t('cancel'))+'</button><button class="btn" id="o-draft" data-act="save-order" data-id="draft">'+esc(t('save_draft'))+'</button><button class="btn primary" id="o-conf" data-act="save-order" data-id="confirmed">'+esc(t('adv_confirmed'))+'</button>');
}
const validLines=m=>m.lines.filter(l=>l.w&&l.c>=1);
function updateOrder(){
  const m=ui.modal;if(!m||m.t!=='order')return;
  let sub=0;
  m.lines.forEach((l,i)=>{const w=l.w?W(l.w):null,lt=$('#lt-'+i),lw=$('#lw-'+i);if(!lt)return;
    if(w&&l.c>=1){const v=l.c*w.cs*w.price;sub+=v;lt.textContent=l.c*w.cs+' '+t('btl')+' · '+money(v);lw.textContent=l.c>w.stock?t('stock_warn',{n:w.stock}):'';}
    else{lt.textContent='';lw.textContent='';}});
  const a=m.acc?A(m.acc):null,blocked=a&&permitState(a).k==='expired',ok=validLines(m).length>0&&!!a;
  $('#o-note').innerHTML=blocked?'<div class="note">'+esc(t('permit_block'))+'</div>':'';
  $('#o-tot').innerHTML=totalsHTML(sub);
  $('#o-draft').disabled=!ok;$('#o-conf').disabled=!ok||blocked;
}
const nextId=()=>'CMD-'+(Math.max(...orders.map(o=>+o.id.slice(4)))+1);
const confirmStock=o=>o.lines.forEach(l=>{const w=W(l.w);w.stock=Math.max(0,w.stock-l.c);});

function renderAll(){document.documentElement.lang=lang==='fr'?'fr-CA':'en-CA';renderSide();renderView();renderLayer();}
const closeLayer=()=>{if(ui.modal)ui.modal=null;else ui.drawer=null;renderLayer();};
const val=id=>{const e=document.getElementById(id);return e?e.value.trim():'';};

document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]');if(!el)return;
  const a=el.dataset.act,id=el.dataset.id;
  if(a==='close-bg'){if(e.target===el)closeLayer();return;}
  if(a==='close'){closeLayer();return;}
  if(a==='nav'){ui.view=id;ui.drawer=null;ui.modal=null;renderAll();window.scrollTo(0,0);return;}
  if(a==='signout'){sb.auth.signOut();return;}
  if(a==='lang'){lang=id;renderAll();return;}
  if(a==='theme'){const r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.dataset.theme=dark?'light':'dark';return;}
  if(a==='acc-f'){ui.accF=id;renderView();return;}
  if(a==='ord-f'){ui.ordF=id;renderView();return;}
  if(a==='open-acc'||a==='open-sup'||a==='open-ord'){ui.modal=null;ui.drawer={t:a.slice(5),id};renderLayer();const d=$('.drawer');if(d)d.scrollTop=0;return;}
  if(a==='new-acc'){ui.modal={t:'acc'};renderLayer();return;}
  if(a==='new-sup'){ui.modal={t:'sup'};renderLayer();return;}
  if(a==='new-ord'){ui.modal={t:'order',acc:id||'',deliver:iso(off(3)),lines:[{w:'',c:1}]};renderLayer();return;}
  if(a==='add-line'){ui.modal.lines.push({w:'',c:1});renderLayer();return;}
  if(a==='rm-line'){const m=ui.modal;m.lines.splice(+el.dataset.i,1);if(!m.lines.length)m.lines.push({w:'',c:1});renderLayer();return;}
  if(a==='save-acc'){
    if(!val('fa-name')){toast(t('req'));return;}
    const pexp=val('fa-pexp')?parseISO(val('fa-pexp')):null;
    const n={id:'a'+Date.now().toString(36),name:val('fa-name'),type:val('fa-type'),city:val('fa-city'),area:val('fa-area'),contact:val('fa-contact'),email:val('fa-email'),pno:val('fa-pno'),pexp,terms:val('fa-terms'),since:base.getFullYear(),note:{en:'',fr:''}};
    accounts.push(n);ui.modal=null;ui.view='cli';ui.drawer={t:'acc',id:n.id};renderAll();toast(t('t_acc'));save(()=>api.insert('accounts',n),()=>{accounts=accounts.filter(x=>x!==n);ui.drawer=null;renderAll();});return;}
  if(a==='save-sup'){
    if(!val('fs-name')){toast(t('req'));return;}
    const n={id:'s'+Date.now().toString(36),name:val('fs-name'),country:val('fs-country'),region:val('fs-region'),contact:val('fs-contact'),email:val('fs-email'),terms:val('fs-terms'),lead:+val('fs-lead')||6,note:{en:'',fr:''}};
    suppliers.push(n);ui.modal=null;ui.view='sup';ui.drawer={t:'sup',id:n.id};renderAll();toast(t('t_sup'));save(()=>api.insert('suppliers',n),()=>{suppliers=suppliers.filter(x=>x!==n);ui.drawer=null;renderAll();});return;}
  if(a==='save-order'){
    const m=ui.modal,lines=validLines(m);if(!m.acc||!lines.length)return;
    const o={id:nextId(),acc:m.acc,date:new Date(base),deliver:m.deliver?parseISO(m.deliver):off(3),status:id,lines:lines.map(l=>({w:l.w,c:l.c}))};
    orders.push(o);if(id==='confirmed')confirmStock(o);
    ui.modal=null;ui.view='ord';ui.drawer={t:'ord',id:o.id};renderAll();toast(t('t_ord',{id:o.id}));save(async()=>{await api.insert('orders',{...o,status:'draft'});if(id==='confirmed')await api.setStatus(o,'confirmed');},()=>{orders=orders.filter(x=>x!==o);ui.drawer=null;renderAll();});return;}
  if(a==='advance'){
    const o=O(id),nx={draft:'confirmed',confirmed:'delivered',delivered:'paid'}[o.status];if(!nx)return;
    if(nx==='confirmed'){if(permitState(A(o.acc)).k==='expired')return;confirmStock(o);}
    const prev=o.status;o.status=nx;renderAll();toast(t('t_st',{id:o.id,s:t('os_'+nx)}));save(()=>api.setStatus(o,nx),()=>{o.status=prev;renderAll();});return;}
});
document.addEventListener('input',e=>{
  const el=e.target;
  if(el.id==='accQ'){ui.accQ=el.value;$('#accRows').innerHTML=accRows();return;}
  if(el.dataset.f==='qty'){ui.modal.lines[+el.dataset.i].c=Math.floor(+el.value)||0;updateOrder();}
});
document.addEventListener('change',e=>{
  const el=e.target,f=el.dataset.f;if(!f||!ui.modal)return;
  if(f==='wine'){ui.modal.lines[+el.dataset.i].w=el.value;updateOrder();}
  else if(f==='deliver')ui.modal.deliver=el.value;
  else if(f==='acc'){ui.modal.acc=el.value;updateOrder();}
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&(ui.drawer||ui.modal)){closeLayer();return;}
  if(e.key==='Enter'&&e.target.matches&&e.target.matches('tr[data-act]'))e.target.click();
});

// ---------- Data layer: Supabase when configured, otherwise demo data ----------
const CFG=window.ARRIVAGE_CONFIG||{};
let sb=null,mode='demo';
const TABLES=['suppliers','wines','shipments','accounts','orders','meta'];
const dstr=d=>d?iso(d):null;
const toRow=(col,o)=>{const d={...o};
  if(col==='accounts')d.pexp=dstr(o.pexp);
  if(col==='orders'){d.date=dstr(o.date);d.deliver=dstr(o.deliver);}
  return d;};
const api={
  async insert(col,o){if(mode!=='sb')return;const {error}=await sb.from(col).insert(toRow(col,o));if(error)throw error;},
  async setStatus(o,s){if(mode!=='sb')return;
    // Confirmation runs in the database so the permit check and the stock deduction happen together.
    const {error}=s==='confirmed'?await sb.rpc('confirm_order',{order_id:o.id}):await sb.from('orders').update({status:s}).eq('id',o.id);
    if(error)throw error;}
};
let busy=Promise.resolve();
const save=(fn,undo)=>{if(mode!=='sb')return;busy=busy.then(()=>fn()).catch(e=>{console.error(e);toast(t('t_err'));if(undo)undo();reload();});};
const nat=(a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true});
const D=s=>s?parseISO(s):null;
const N=v=>v==null?0:Number(v);
const COLS={
 suppliers:r=>{suppliers=r.map(x=>({...x,note:x.note||{en:'',fr:''}})).sort(nat);},
 wines:r=>{wines=r.map(x=>({...x,vint:N(x.vint),cs:N(x.cs),cost:N(x.cost),price:N(x.price),stock:N(x.stock),transit:N(x.transit)})).sort(nat);},
 shipments:r=>{shipments=r.map(x=>({...x,cases:N(x.cases),eta:D(x.eta)}));},
 accounts:r=>{accounts=r.map(x=>({...x,pexp:D(x.pexp),note:x.note||{en:'',fr:''}}));},
 orders:r=>{orders=r.map(x=>({...x,date:D(x.date),deliver:D(x.deliver),lines:x.lines||[]}));},
 meta:r=>{const m=r.find(x=>x.id==='monthly');seedMonthly=m&&m.vals?m.vals:[];}};
let rq=0;
function refresh(){
  if(rq)return;
  rq=requestAnimationFrame(()=>{rq=0;
    if(ui.state!=='ready'){renderAll();return;}
    const dr=$('.drawer'),sc=dr?dr.scrollTop:0,ae=document.activeElement;
    renderSide();
    if(ae&&ae.id==='accQ'){const r=$('#accRows');if(r)r.innerHTML=accRows();}else renderView();
    if(ui.drawer&&!ui.modal){renderLayer();const d2=$('.drawer');if(d2)d2.scrollTop=sc;}
  });}
async function loadAll(){
  const res=await Promise.all(TABLES.map(tb=>sb.from(tb).select('*')));
  res.forEach(r=>{if(r.error)throw r.error;});
  res.forEach((r,i)=>COLS[TABLES[i]](r.data));
}
let reloadT=0;
function reload(){clearTimeout(reloadT);reloadT=setTimeout(async()=>{try{await loadAll();refresh();}catch(e){console.error(e);}},250);}
let channel=null;
async function enter(session){
  ui.user=session&&session.user?session.user.email:'';
  ui.state='loading';renderAll();
  try{await loadAll();ui.state='ready';}
  catch(e){ui.state='error';ui.err=e.message||String(e);}
  renderAll();
  if(ui.state==='ready'&&!channel){
    channel=sb.channel('arrivage').on('postgres_changes',{event:'*',schema:'public'},reload).subscribe();
  }
}
document.addEventListener('submit',async e=>{
  if(e.target.id!=='loginForm')return;
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');btn.disabled=true;
  const {data,error}=await sb.auth.signInWithPassword({email:val('lg-email'),password:document.getElementById('lg-pass').value});
  btn.disabled=false;
  if(error){ui.loginErr=error.status===400?t('login_err'):(error.message||t('login_err'));$('#lg-err').textContent=ui.loginErr;return;}
  ui.loginErr='';enter(data.session);
});
async function start(){
  if(CFG.supabaseUrl&&CFG.supabaseAnonKey&&!window.supabase){
    // Configured for Supabase but the library didn't load: never fall back to demo data silently.
    ui.state='error';ui.err='Supabase library did not load. Check your connection and reload.';renderAll();return;
  }
  if(CFG.supabaseUrl&&CFG.supabaseAnonKey){
    mode='sb';
    sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey);
    sb.auth.onAuthStateChange(ev=>{if(ev==='SIGNED_OUT'){if(channel){sb.removeChannel(channel);channel=null;}ui.state='login';ui.user='';ui.drawer=null;ui.modal=null;renderAll();}});
    const {data}=await sb.auth.getSession();
    if(data.session)enter(data.session);else{ui.state='login';renderAll();}
    return;
  }
  // Demo mode: sample data from data/seed.json, changes kept in memory only.
  try{const r=await fetch('data/seed.json');const j=await r.json();
    Object.keys(COLS).forEach(c=>COLS[c]((j[c]||[]).map(x=>({...x}))));ui.state='ready';}
  catch(e){ui.state='nodb';}
  renderAll();
}
renderAll();
start();
})();
