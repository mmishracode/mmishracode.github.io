function toggleMobileMenu(){
	// Implement simple mobile menu toggle if needed, or leave placeholder
    console.log("Toggle menu");
}

// Workflow Tab Switching
function openWorkflow(workflowId) {
    // Hide all contents
    const contents = document.querySelectorAll('.workflow-content');
    contents.forEach(id => id.classList.remove('active'));

    // Deactivate all buttons
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    // Show selected
    document.getElementById(workflowId).classList.add('active');
    
    // Activate button
    // Find button with onclick matching
    const activeBtn = Array.from(btns).find(b => b.getAttribute('onclick').includes(workflowId));
    if(activeBtn) activeBtn.classList.add('active');

    // Trigger simulation start if needed
    if(workflowId === 'sales') startSalesSimulation();
    if(workflowId === 'leads') startLeadsSimulation();
}

// --- Onboarding Chat Logic ---
const onboardingFlow = [
    { text: "Great! And what industry is your company in?", type: "bot", delay: 1000 },
    { text: "I'm setting up your profile for that industry... ⚡", type: "bot", delay: 2000 },
    { text: "All set! Would you like to invite team members now?", type: "bot", delay: 3500 }
];
let flowIndex = 0;

function handleOnboardingSend() {
    const input = document.getElementById('onboarding-input');
    const msg = input.value;
    if(!msg) return;

    addMessage(msg, 'user');
    input.value = '';

    // Simulate bot thinking and response
    if(flowIndex < onboardingFlow.length) {
        const next = onboardingFlow[flowIndex];
        setTimeout(() => {
            addMessage(next.text, 'bot');
            flowIndex++;
        }, next.delay);
    }
}

function addMessage(text, type) {
    const chatBody = document.getElementById('onboarding-chat-body');
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}


// --- Sales Dashboard Simulation ---
let salesInterval;
function startSalesSimulation() {
    if(salesInterval) clearInterval(salesInterval);
    
    const emailsEl = document.getElementById('sales-emails');
    const logEl = document.getElementById('sales-log');
    let emailCount = 1204;

    const activities = [
        "Found contact: VP of Engineering @ TechCorp",
        "Enriching profile for Sarah J...",
        "Generating personalized outreach...",
        "Email sent to sarah.j@techcorp.io",
        "Reply received: 'Interested, tell me more'",
        "Scheduling follow-up task."
    ];

    salesInterval = setInterval(() => {
        // Increment emails
        emailCount += Math.floor(Math.random() * 3);
        if(emailsEl) emailsEl.innerText = emailCount.toLocaleString();

        // Add log entry
        if(logEl) {
            const action = activities[Math.floor(Math.random() * activities.length)];
            const entry = document.createElement('div');
            entry.className = 'log-item';
            entry.innerText = `[${new Date().toLocaleTimeString()}] ${action}`;
            logEl.prepend(entry);
            
            // Keep log clean
            if(logEl.children.length > 5) logEl.lastChild.remove();
        }

    }, 2000);
}


// --- Lead Gen Visualization ---
let leadsInterval;
function startLeadsSimulation() {
    if(leadsInterval) clearInterval(leadsInterval);
    
    const listEl = document.getElementById('lead-list');
    const names = ["Acme Inc", "Globex", "Soylent Corp", "Initech", "Umbrella Corp", "Cyberdyne"];
    
    leadsInterval = setInterval(() => {
        if(listEl) {
            const name = names[Math.floor(Math.random() * names.length)];
            const score = Math.floor(Math.random() * (99 - 70) + 70);
            
            const card = document.createElement('div');
            card.className = 'lead-card';
            card.innerHTML = `<strong>${name}</strong><br><span style="color:#00ff88">Match: ${score}%</span>`;
            
            listEl.prepend(card);
            
            if(listEl.children.length > 4) listEl.lastChild.remove();
        }
        
    }, 1500);
}

// Start visualizations on load
document.addEventListener('DOMContentLoaded', () => {
    // Optional: Start one by default if visible, or wait for click
    // startSalesSimulation(); 
    // startLeadsSimulation();
});