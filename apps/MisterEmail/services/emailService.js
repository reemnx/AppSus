import storageServices from '../../../services/storageService.js';
import getRandomInt from '../../../services/getRandomInt.js';


export default {
    query,
    getEmailById,
    readToggle,
    starToggle,
    sentMail,
    draftMail,
    removeEmail,
    readMail,
    sortBy
}

const KEY = 'emails';

let gEmails = storageServices.loadFromStorage(KEY) ||
{
    income: [
        { id: getId(), address: 'test_mail@gmail.com', subject: 'test', body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae minima magni quas maiores porro et, nulla cupiditate facilis officia id eius accusamus veniam velit, facere tempore doloribus nostrum dolores neque enim nobis aut at eos quaerat reprehenderit? Obcaecati veniam ex odio unde ratione quod recusandae, fuga impedit. Quo, at? Voluptatibus.', isRead: false, isStarred: true, sentAt: 1551133930594 },
        { id: getId(), address: 'dor@gmail.com', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: true, sentAt: 1583133960594 },
        { id: getId(), address: 'reem@gmail.com', subject: 'Heyyyyyyy', body: 'some random text!', isRead: false, isStarred: true, sentAt: 1581133930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up4!', isRead: false, isStarred: false, sentAt: 1531133939594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up5!', isRead: false, isStarred: true, sentAt: 1551183930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up6!', isRead: true, isStarred: true, sentAt: 1550133930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up7!', isRead: true, isStarred: false, sentAt: 1501103930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up8!', isRead: false, isStarred: false, sentAt: 1451133930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up9!', isRead: true, isStarred: true, sentAt: 1251131930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up10!', isRead: true, isStarred: false, sentAt: 1453733930594 }
    ],
    sent: [
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up6!', isRead: false, isStarred: false, sentAt: 1553143930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up7!', isRead: false, isStarred: false, sentAt: 1555133130594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up8!', isRead: false, isStarred: false, sentAt: 1552133930794 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up9!', isRead: false, isStarred: true, sentAt: 1551283960594 }
    ],
    drafts: [
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up18!', isRead: false, isStarred: false, sentAt: 1552333930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up19!', isRead: false, isStarred: false, sentAt: 1553233930594 },
    ]
}
storageServices.saveToStorage(KEY, gEmails);
sortBy('sentAt');


function getId() {
    let key = '';
    for (let i = 0; i < 10; i++) {
        key += String.fromCharCode(getRandomInt(65, 91));
    }
    return key;
}

function query(lable) {
    let unreadCnt = 0;
    gEmails.income.forEach(mail => {
        if (!mail.isRead) unreadCnt++;
    })
    const allLabelsMails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    const mails = (lable !== 'starred') ? gEmails[lable].slice() : allLabelsMails.filter(email => email.isStarred === true);
    return Promise.resolve({ mails, unreadCnt });
}

function getEmailById(id) {
    const allLabelsMails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    const currEmail = allLabelsMails.find(email => email.id === id);
    return Promise.resolve(currEmail);
}

function readToggle(id) {
    const emails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    emails.forEach(email => {
        if (email.id === id) email.isRead = !email.isRead
    });
    storageServices.saveToStorage(KEY, gEmails);
    return Promise.resolve();
}

function starToggle(id) {
    const emails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    emails.forEach(email => {
        if (email.id === id) email.isStarred = !email.isStarred
    });
    storageServices.saveToStorage(KEY, gEmails);
    return Promise.resolve();
}

function removeEmail(id) {
    const keys = Object.keys(gEmails);
    keys.forEach(key => {
        gEmails[key].forEach((email, idx) => {
            if (email.id === id) gEmails[key].splice(idx, 1);
        })
    });
    storageServices.saveToStorage(KEY, gEmails);
    return Promise.resolve();
}

function sentMail(mail) {
    let newMail = mail;
    newMail.id = getId();
    newMail.isRead = false;
    newMail.isStarred = false;
    gEmails.income.unshift({ ...newMail });
    gEmails.sent.unshift({ ...newMail });
    storageServices.saveToStorage(KEY, gEmails);
    return Promise.resolve({ 'msg': 'Sent successfully to:', 'content': mail.address, 'type': 'success' });
}

function draftMail(mail) {
    console.log(mail);
    
    let newMail = mail;
    newMail.id = getId();
    newMail.isRead = false;
    newMail.isStarred = false;
    gEmails.drafts.unshift({ ...newMail });
    storageServices.saveToStorage(KEY, gEmails);
    return Promise.resolve({ 'msg': 'Saved to draft', 'content': mail.subject, 'type': 'success'  })
}

function readMail(id) {
    const emails = [...gEmails.income, ...gEmails.sent, ...gEmails.drafts];
    emails.forEach(email => {
        if (email.id === id) email.isRead = true;
    });
    storageServices.saveToStorage(KEY, gEmails);
    return Promise.resolve();
}

function sortBy(val) {
    const keys = Object.keys(gEmails);
    if (val === 'sentAt') {
        keys.forEach(key => {
            gEmails[key].sort(function (a, b) {
                return b[val] - a[val]
            })
        })
    } else {
        keys.forEach(key => {
            gEmails[key].sort(function (a, b) {
                if (!a[val]) return -1;
                if (!b[val]) return 1;
                var subjectA = a[val].toUpperCase();
                var subjectB = b[val].toUpperCase();
                if (subjectA < subjectB) return -1;
                if (subjectA > subjectB) return 1;
                return 0;
            });
        })
    }
    return Promise.resolve();
}