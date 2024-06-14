(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const $="https://todobackend-re9d.onrender.com",w=`${$}/goal`;async function S(){let a=new Date().toLocaleString().split(",")[0].split("/");return a[2]+"-"+(a[0].length===2?a[0]:"0"+a[0])+"-"+(a[1].length===2?a[1]:"0"+a[1])}const d=localStorage.getItem("accessToken");async function N(){if(!d||d==="")throw new Error("Access token not found");let e=await S();const t=await fetch(`${w}?date=${e}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`}});if(!t.ok)throw localStorage.clear(),new Error("Failed to fetch goals");return await t.json()}async function j(e){if(!d||d==="")throw new Error("Access token not found");const t=await fetch(w,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to create todo");return await t.json()}async function H(e,t){if(!d||d==="")throw new Error("Access token not found");const a=await fetch(`${w}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to update todo");return await a.json()}async function O(e){if(!d||d==="")throw new Error("Access token not found");const t=await fetch(`${w}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({goalId:e})});if(!t.ok)throw new Error("Failed to delete goal");return await t.json()}const C=$;async function F(e,t){const a=await fetch(`${C}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})});if(a.ok){const s=await a.json();return localStorage.setItem("accessToken",s==null?void 0:s.accessToken),s}else throw new Error("Failed to login")}async function W(e,t){const a=await fetch(`${C}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})});if(!a.ok)throw new Error("Failed to register");return await a.json()}async function _(){const e=await N();localStorage.setItem("goals",e);const t=await S(),a=document.getElementById("app"),s=document.createElement("nav");s.className="navbar navbar-expand-lg bg-body-tertiary",s.innerHTML=`
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Goals</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link" style="cursor: pointer;">Calendar</a>
            </li>
            <li class="nav-item cursor-pointer">
            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#new-goal-modal" style="cursor: pointer;">New Goal</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" style="cursor: pointer;">Progress</a>
            </li>
        </ul>
        <span class="navbar-text px-2">
            ${t}
        </span>
        <span class="navbar-text">
            "Aim up"
        </span>
        <button class="btn btn-dark mx-2" id="logout-button">
            Logout
        </button>
        </div>
    </div>

    `;const o=document.createElement("div"),n=document.createElement("div"),c=document.createElement("div"),E=document.createElement("div"),I=document.createElement("div");let v="border rounded m-3 m-md-5 p-3 p-md-5";c.className=v,n.className=v,E.className=v,I.className=v;const D=`
        <ol class="list-group list-group-numbered">
            ${e.dayGoals.length>0?e.dayGoals.map(l=>`
            <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${l._id} class="list-group-item list-group-item-action ${l.completed===!0?"list-group-item-success":""}">
                ${l.goalTitle}
            </li>
        `).join(""):"No goals for today"}
        </ol>
    `;n.innerHTML=`
        <h2>Today's goals</h2>
        ${D}
    `;const M=`
        <ol class="list-group list-group-numbered">
            ${e.weekGoals.length>0?e.weekGoals.map(l=>`
        <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${l._id} class="list-group-item list-group-item-action ${l.completed===!0?"list-group-item-success":""}">
            ${l.goalTitle}
        </li>
        `).join(""):"No goals for this week"}
        </ol>
    `;c.innerHTML=`
        <h2>This week's goals</h2>
        ${M}
    `;const A=`
        <ol class="list-group list-group-numbered">
            ${e.monthGoals.length>0?e.monthGoals.map(l=>`
            <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${l._id} class="list-group-item list-group-item-action ${l.completed===!0?"list-group-item-success":""}">
                ${l.goalTitle}
            </li>
        `).join(""):"No goals for this month"}
        </ol>
    `;E.innerHTML=`
        <h2>This month's goals</h2>
        ${A}
    `;const P=`
        <ol class="list-group list-group-numbered">
            ${e.seasonGoals.length>0?e.seasonGoals.map(l=>`
            <li data-bs-toggle="modal" data-bs-target="#single-goal-modal" data-identity="goal" data-goal-id=${l._id} class="list-group-item list-group-item-action ${l.completed===!0?"list-group-item-success":""}">
                ${l.goalTitle}
            </li>
        `).join(""):"No goals for this season"}
        </ol>
    `;I.innerHTML=`
        <h2>This season's goals</h2>
        ${P}
    `;const m=document.createElement("div");m.className="modal fade",m.id="new-goal-modal",m.tabIndex="-1",m.setAttribute("aria-hidden","true"),m.setAttribute("aria-labelledby","newGoalModalLabel"),m.innerHTML=`
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="newGoalModalLabel">New Goal</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" id="alert-div" role="alert" style="display:none;">
                    <div>All three information is required to create Goal.</div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Your Goal</span>
                    <textarea class="form-control" aria-label="With textarea" id="goal-title-textarea"></textarea>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Span</label>
                    <select class="form-select" id="span-selector">
                        <option selected>Choose span</option>
                        <option value="1">Day</option>
                        <option value="2">Week</option>
                        <option value="3">Month</option>
                        <option value="4">Season</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Date</label>
                    <input type="date" id="new-goal-date">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="create-goal-button">Create Goal</button>
            </div>
            </div>
        </div>

    `;const g=document.createElement("div");g.className="modal fade",g.id="single-goal-modal",g.tabIndex="-1",g.setAttribute("aria-hidden","true"),g.setAttribute("aria-labelledby","singleGoalModalLabel"),g.innerHTML=`
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="singleGoalModalLabel">Single Goal</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="single-goal-modal-body">
                <div class="input-group mb-3">
                    <span class="input-group-text">Your Goal</span>
                    <textarea class="form-control" aria-label="With textarea" id="goal-title-field"></textarea>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Span</label>
                    <select class="form-select" id="span-selector-field">
                        <option selected>Choose span</option>
                        <option value="1">Day</option>
                        <option value="2">Week</option>
                        <option value="3">Month</option>
                        <option value="4">Season</option>
                    </select>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Date</label>
                    <input type="date" id="goal-date-field">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-text">
                        <label for="goal-completed-field" class="mx-2">Completed</label>
                        <input class="form-check-input mt-0" type="checkbox" value="" id="goal-completed-field">
                    </div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Description</span>
                    <textarea class="form-control" aria-label="With textarea" id="goal-description-field"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="delete-button">Delete</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="save-changes-button">Save changes</button>
            </div>
            </div>
        </div>

    `,o.appendChild(n),o.appendChild(c),o.appendChild(E),o.appendChild(I),o.appendChild(m),o.appendChild(g),a.appendChild(s),a.appendChild(o),document.getElementById("logout-button").addEventListener("click",()=>{localStorage.clear(),window.location.reload()});const T=document.getElementById("create-goal-button");T&&T.addEventListener("click",async()=>{const l=document.getElementById("goal-title-textarea"),u=document.getElementById("span-selector"),f=document.getElementById("new-goal-date");if(!l.value||!u.value||!f.value){const r=document.getElementById("alert-div");r&&(r.style.display="block")}else{console.log(typeof l.value),console.log(typeof u.value),console.log(typeof f.value);let r={goalTitle:l.value,type:u.value==="1"?"D":u.value==="2"?"W":u.value==="3"?"M":"S",date:f.value};const y=await j(r);console.log(y),window.location.reload()}}),document.querySelectorAll('[data-identity="goal"]').forEach(l=>{l.addEventListener("click",function(){const u=this.getAttribute("data-goal-id");function f(p){let i=e.seasonGoals.find(b=>b._id===p);return i||(i=e.monthGoals.find(b=>b._id===p),i)||(i=e.weekGoals.find(b=>b._id===p),i)||(i=e.dayGoals.find(b=>b._id===p),i)?i:null}const r=f(u),y=document.getElementById("goal-title-field"),h=document.getElementById("span-selector-field"),L=document.getElementById("goal-date-field"),k=document.getElementById("goal-completed-field"),G=document.getElementById("goal-description-field");y.value=r.goalTitle,h.value=r.type==="D"?"1":r.type==="W"?"2":r.type==="M"?"3":"4",L.value=r.date,k.checked=r.completed===!0?"true":"",G.value=r.description;const x=document.getElementById("delete-button");x&&x.addEventListener("click",async()=>{console.log("delete button clicked",u);const p=await O(u);console.log(p),window.location.reload()});const B=document.getElementById("save-changes-button");B&&B.addEventListener("click",async()=>{const p={goalTitle:y.value,type:h.value==="1"?"D":h.value==="2"?"W":h.value==="3"?"M":"S",date:L.value,completed:!!k.checked,description:G.value},i=await H(u,p);console.log(i),window.location.reload()})})})}async function U(){const e=document.getElementById("app");e.innerHTML="";const t=document.createElement("main");t.id="auth-container",t.className="container-fluid d-flex justify-content-center align-items-center flex-column mt-2",t.innerHTML=`
   <h2>Login</h2>
    <div class="form-floating mb-3">
        <input id="username-input" type="text" class="form-control" id="floatingInput" placeholder="username">
        <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating mb-3">
        <input id="password-input" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-primary" id="login-button">Login</button>
    <p>Don't have an account, register <a id="register-here" style="cursor:pointer; color: blue;">here</a></p>
   `,e.appendChild(t),document.getElementById("register-here").addEventListener("click",()=>{R()}),document.getElementById("login-button").addEventListener("click",async()=>{const o=document.getElementById("username-input").value,n=document.getElementById("password-input").value;!o||!n?alert("Username and password are required"):(await F(o,n),window.location.reload())})}function R(){const e=document.getElementById("app");e.innerHTML="";const t=document.createElement("main");t.id="auth-container",t.className="container-fluid d-flex justify-content-center align-items-center flex-column mt-2",t.innerHTML=`
   <h2>Register</h2>
    <div class="form-floating mb-3">
        <input id="username-input" type="text" class="form-control" id="floatingInput" placeholder="username">
        <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating mb-3">
        <input id="password-input" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating mb-3">
        <input id="confirm-password-input" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Confirm password</label>
    </div>
    <button class="btn btn-primary" id="register-button">Register</button>
    <p>Have an account, login <a id="login-here" style="cursor:pointer; color: blue;">here</a></p>
   `,e.appendChild(t),document.getElementById("login-here").addEventListener("click",()=>{renderLogin()}),document.getElementById("register-button").addEventListener("click",async()=>{const o=document.getElementById("username-input").value,n=document.getElementById("password-input").value,c=document.getElementById("confirm-password-input").value;!o||!n||!c?alert("Username, password and confirmed password are required"):n!==c?alert("Confirmed password does not match"):(await W(o,n),window.location.reload())})}document.addEventListener("DOMContentLoaded",async()=>{try{await _()}catch{await U()}});
