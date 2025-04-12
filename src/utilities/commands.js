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
        live: 'https://ceegecrypto.firebaseapp.com/',
    },
    {
        name: 'SnakeRaylib',
        github: 'https://github.com/Bissmark/Crypto-Page',
        live: 'https://ceegecrypto.firebaseapp.com/',
    },
    {
        name: 'BulletFun',
        github: 'https://github.com/Bissmark/bulletFun',
        live: 'https://ceegecrypto.firebaseapp.com/',
    },
    {
        name: 'To-Do List',
        github: 'https://github.com/Bissmark/School-Notes-V2',
        live: 'https://school-notes-backend.onrender.com/',
    },
];

export const commands = {
    "--help": "Here are the available commands: --help, --about, --contact, --resume, --projects\n\n If you want to clear the command prompt history, press Ctrl + L\n\n If you want to clear the command prompt input field, press Ctrl + C",
    "--about": "I am a software engineer and I love to code!",
    "--contact": "You can contact me at:",
    "--resume": "You can view my resume at:",
    "--projects": { type: 'projects', data: projects },
    "--desktop": "In the desktop, you can double click on either My Computer to see the different projects that I have done, they will have a link to the github page and a link to the live hosted site, if you double click on the Browser, you will get some instructions for how to navigate that and what to type into the address bar",
}