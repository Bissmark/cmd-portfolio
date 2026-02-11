// This file will be for commands that you can input into the cmd window to show different things

const projects = [
    {
        name: 'Ceege Crypto',
        github: 'https://github.com/Bissmark/Crypto-Page',
        live: 'https://ceegecrypto.firebaseapp.com/',
    },
    {
        name: 'GeoWhere',
        github: 'https://github.com/Bissmark/GeoWhere-Testing',
        live: 'https://geowhere.netlify.app/',
    },
    {
        name: 'Trello',
        github: 'https://github.com/Bissmark/trello',
        live: 'https://trello-frontend-q3pp.onrender.com/',
    },
    {
        name : 'Colony Simulator',
        github: 'https://github.com/Bissmark/ColonySimulatorUnity'
    },
    // {
    //     name: 'SnakeRaylib',
    //     github: 'https://github.com/Bissmark/Crypto-Page',
    // },
    {
        name: 'BulletFun',
        github: 'https://github.com/Bissmark/bulletFun',
        live: 'game:bulletfun',
        gameSrc: '/bulletFun/BulletFun.html',
        gameTitle: 'Bullet Fun',
    },
    {
        name: 'Hud Engine (Name will change)',
        github: 'https://github.com/Bissmark/hudEngine'
    }
    // {
    //     name: 'To-Do List',
    //     github: 'https://github.com/Bissmark/School-Notes-V2',
    //     live: 'https://school-notes-backend.onrender.com/',
    // },
];

export const commands = {
    "--help": "Here are the available commands: --help, --about, --contact, --resume, --projects\n\n If you want to clear the command prompt history, press Ctrl + L\n\n If you want to clear the command prompt input field, press Ctrl + C",
    "--about": "I am a Sydney-based Junior Full-Stack Developer with a deep passion for technology and coding. I love learning different languages and frameworks. I thrive on problem-solving, working under pressure, and tackling challenges head-on. I enjoy collaborating with diverse teams, constantly learning, and bringing innovative ideas to life.\n\n My journey in programming started in 2010 with game development, where I worked for two years before exploring different fields, including gardening and racehorse handling. These experiences taught me adaptability, perseverance, and the ability to take projects from concept to completion.\nn In my free time, I love playing a wide variety of video games—from platformers and RPGs to MMOs and soccer simulators. I'm also an avid reader of fantasy novels, enjoy cooking, and appreciate walking.",
    "--contact": { 
        type: 'contact', 
        data: [
            { label: 'Email', value: 'holt.christopher1@gmail.com'},
            { label: 'Phone', value: '0408 469 577'},
            { label: 'Github', value: 'https://github.com/Bissmark', url: 'https://github.com/Bissmark'},
        ],
    },
    "--resume": {
        type: 'resume',
        data: [
            { label: 'Resume', value: 'view my Resume', url: 'https://drive.google.com/file/d/1gkE9EZ-LsJPS-7PbZkPG0QDeTAbnaote/view?usp=sharing' },
        ],
    },
    "--projects": { type: 'projects', data: projects },
    "--desktop": "In the desktop, you can double click on either My Computer to see the different projects that I have done, they will have a link to the github page and a link to the live hosted site, if you double click on the Browser, you will get some instructions for how to navigate that and what to type into the address bar",
}