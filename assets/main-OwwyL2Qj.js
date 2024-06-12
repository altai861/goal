(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="http://localhost:3500",v=`${m}/goal`;async function w(){let o=new Date().toLocaleString().split(",")[0].split("/");return o[2]+"-"+(o[0].length===2?o[0]:"0"+o[0])+"-"+(o[1].length===2?o[1]:"0"+o[1])}const p=localStorage.getItem("accessToken");async function E(){if(!p||p==="")throw new Error("Access token not found");let s=await w();const a=await fetch(`${v}?date=${s}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`}});if(!a.ok)throw localStorage.clear(),new Error("Failed to fetch goals");return await a.json()}const h=m;async function T(s,a){const o=await fetch(`${h}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,password:a})});if(o.ok){const n=await o.json();return localStorage.setItem("accessToken",n==null?void 0:n.accessToken),n}else throw new Error("Failed to login")}async function k(s,a){const o=await fetch(`${h}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,password:a})});if(!o.ok)throw new Error("Failed to register");return await o.json()}async function $(){const s=await E(),a=document.getElementById("app"),o=document.createElement("nav");o.className="navbar navbar-expand-lg bg-body-tertiary",o.innerHTML=`
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Goals</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Calendar</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">New Goal</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Progress</a>
            </li>
        </ul>
        <button class="btn btn-dark mx-2" id="logout-button">
            Logout
        </button>
        <span class="navbar-text">
            "Aim up"
        </span>
        </div>
    </div>

    `;const n=document.createElement("div"),e=document.createElement("div"),t=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div");t.className="p-5",e.className="p-5",r.className="p-5",i.className="p-5",console.log(s);const c=`
        <ul class="list-group">
            ${s.dayGoals.map(l=>`
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${l._id}" ${l.completed?"checked":""}>
                <label class="form-check-label" for="${l._id}">${l.goalTitle}</label>
            </li>
        `).join("")}
        </ul>
    `;e.innerHTML=`
        <h2>Today's goals</h2
        ${c}
    `;const f=`
        <ul class="list-group">
            ${s.weekGoals.map(l=>`
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${l._id}" ${l.completed?"checked":""}>
                <label class="form-check-label" for="${l._id}">${l.goalTitle}</label>
            </li>
        `).join("")}
        </ul>
    `;t.innerHTML=`
        <h2>This week's goals</h2
        ${f}
    `;const b=`
        <ul class="list-group">
            ${s.monthGoals.map(l=>`
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${l._id}" ${l.completed?"checked":""}>
                <label class="form-check-label" for="${l._id}">${l.goalTitle}</label>
            </li>
        `).join("")}
        </ul>
    `;r.innerHTML=`
        <h2>This month's goals</h2
        ${b}
    `;const y=`
        <ul class="list-group">
            ${s.seasonGoals.map(l=>`
            <li class="list-group-item ">
                <input class="form-check-input me-1" type="checkbox" id="${l._id}" ${l.completed?"checked":""}>
                <label class="form-check-label" for="${l._id}">${l.goalTitle}</label>
            </li>
        `).join("")}
        </ul>
    `;i.innerHTML=`
        <h2>This season's goals</h2
        ${y}
    `,n.appendChild(e),n.appendChild(t),n.appendChild(r),n.appendChild(i),a.appendChild(o),a.appendChild(n),document.getElementById("logout-button").addEventListener("click",()=>{localStorage.removeItem("accessToken"),window.location.reload()})}async function g(){const s=document.getElementById("app");s.innerHTML="";const a=document.createElement("main");a.id="auth-container";const o=document.createElement("h1"),n=document.createElement("form"),e=document.createElement("input");e.type="text",e.id="username-input",e.placeholder="username";const t=document.createElement("input");t.type="password",t.id="password-input",t.placeholder="password",e.required=!0,t.required=!0;const r=document.createElement("button");r.type="submit",r.textContent="Login",r.id="login-button",n.appendChild(e),n.appendChild(t),n.appendChild(r),n.addEventListener("submit",async d=>{d.preventDefault();try{const c=await T(e.value,t.value);console.log(c),window.location.reload()}catch(c){alert(c.message)}});const i=document.createElement("p");i.innerHTML="Don't have an account, register <a id='register-here'>here</a>",o.innerHTML="Login",a.appendChild(o),a.appendChild(n),a.appendChild(i),s.appendChild(a),document.getElementById("register-here").addEventListener("click",()=>{L()})}function L(){const s=document.getElementById("app");s.innerHTML="";const a=document.createElement("main");a.id="auth-container";const o=document.createElement("h1"),n=document.createElement("form"),e=document.createElement("input");e.type="text",e.id="username-input",e.placeholder="username";const t=document.createElement("input");t.type="password",t.id="password-input",t.placeholder="password";const r=document.createElement("input");r.type="password",r.id="password-input-confirm",r.placeholder="confirm password",e.required=!0,t.required=!0,r.required=!0;const i=document.createElement("button");i.type="submit",i.textContent="Register",i.id="login-button",n.appendChild(e),n.appendChild(t),n.appendChild(r),n.appendChild(i),n.addEventListener("submit",async c=>{c.preventDefault();try{if(r.value!==t.value){alert("Password does not match");return}const u=await k(e.value,t.value);console.log(u),alert("Registration successful"),window.location.reload()}catch(u){alert(u.message)}});const d=document.createElement("p");d.innerHTML="Have an account, login <a id='register-here'>here</a>",o.innerHTML="Register",a.appendChild(o),a.appendChild(n),a.appendChild(d),s.appendChild(a),document.getElementById("register-here").addEventListener("click",()=>{g()})}document.addEventListener("DOMContentLoaded",async()=>{try{await $()}catch{await g()}});
