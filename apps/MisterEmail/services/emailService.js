import storageServices from '../../../services/storageService.js';
import getRandomInt from '../../../services/getRandomInt.js';

export default {
    getEmails,
    readToggle,
    starToggle,
    sentMail,
    draftMail

}

const KEY = 'emails';

let gEmails = storageServices.loadFromStorage(KEY) || {
    income: [
        { id: getId(),address:'no-replay@gmail.com', subject: 'testtt testetetetet tstet?', body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae minima magni quas maiores porro et, nulla cupiditate facilis officia id eius accusamus veniam velit, facere tempore doloribus nostrum dolores neque enim nobis aut at eos quaerat reprehenderit? Obcaecati veniam ex odio unde ratione quod recusandae, fuga impedit. Quo, at? Voluptatibus.', isRead: false, isStarred: true, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up2!', isRead: true, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up3!', isRead: false, isStarred: true, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up4!', isRead: false, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up5!', isRead: false, isStarred: true, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up6!', isRead: true, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up7!', isRead: true, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up8!', isRead: false, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up9!', isRead: false, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up10!', isRead: false, isStarred: false, sentAt: 1551133930594 }
    ],
    sent: [
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up6!', isRead: false, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up7!', isRead: false, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up8!', isRead: false, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up9!', isRead: false, isStarred: true, sentAt: 1551133930594 }
    ],
    drafts: [
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up18!', isRead: false, isStarred: false, sentAt: 1551133930594 },
        { id: getId(),address:'no-replay@gmail.com', subject: 'Wassap?', body: 'Pick up19!', isRead: false, isStarred: false, sentAt: 1551133930594 },
    ]
}

function getId() {
    let key = '';
    for (let i = 0; i < 10; i++) {
        key += String.fromCharCode(getRandomInt(33, 127));
    }
    return key;
}

function getEmails(filter) {
    const allLabelsMails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    const mails = (filter !== 'starred') ? gEmails[filter].slice() : allLabelsMails.filter(email => email.isStarred === true);
    return Promise.resolve(mails);
}

function readToggle(id) {
    const emails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    emails.forEach(email => {
        if (email.id === id) email.isRead = !email.isRead
    });
    return Promise.resolve();
}

function starToggle(id) {
    const emails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    emails.forEach(email => {
        if (email.id === id) email.isStarred = !email.isStarred
    });
    return Promise.resolve();
}

function sentMail(mail){
    let newMail = mail;
    newMail.id = getId();
    newMail.isRead = false;
    newMail.isStarred = false;
    console.log(newMail)
    gEmails.income.unshift({...newMail})
    gEmails.sent.unshift({...newMail})
    return Promise.resolve()
}

function draftMail(mail){
    let newMail = mail;
    newMail.id = getId();
    newMail.isRead = false;
    newMail.isStarred = false;
    console.log(newMail)
    gEmails.drafts.unshift({...newMail})
    return Promise.resolve()
}