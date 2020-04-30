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
        { id: getId(), address: 'dor@gmail.com', subject: 'Hello there!', body: 'Im using Email!', isRead: false, isStarred: true, sentAt: 1583133960594 },
        { id: getId(), address: 'reem@gmail.com', subject: 'Heyyyyyyy', body: 'some random text!', isRead: false, isStarred: true, sentAt: 1581133930594 },
        { id: getId(), address: 'test_mail@gmail.com', subject: 'Test', body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae minima magni quas maiores porro et, nulla cupiditate facilis officia id eius accusamus veniam velit, facere tempore doloribus nostrum dolores neque enim nobis aut at eos quaerat reprehenderit? Obcaecati veniam ex odio unde ratione quod recusandae, fuga impedit. Quo, at? Voluptatibus.', isRead: false, isStarred: true, sentAt: 1551133930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up!', isRead: false, isStarred: false, sentAt: 1531133939594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Do you like Cheese Whiz??', body: ' It`s unreal, uncanny, makes you wonder if something is wrong, it seems to seek your attention for all the wrong reasons', isRead: false, isStarred: true, sentAt: 1551183930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business.', isRead: true, isStarred: true, sentAt: 1550133930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassaaaaaaaaaaap?', body: 'Consider this: You made all the required mock ups for commissioned layout, got all the approvals, built a tested', isRead: true, isStarred: false, sentAt: 1501103930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Lorem Ipsum is bad?', body: 'There`s lot of hate out there for a text that amounts to little more than garbled words in an old language. The villagers are out there with a vengeance to get that Frankenstein, wielding torches and pitchforks, wanting to tar and feather it at the least, running it out of town in shame.', isRead: false, isStarred: false, sentAt: 1451133930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'the design', body: 'Typographers of yore didn`t come up with the concept of dummy copy because people thought that content is inconsequential window dressing, only there to be used by designers who can’t be bothered to read. Lorem Ipsum is needed because words matter, a lot. Just fill up a page with draft copy about the client’s business and they will actually read it and comment on it. They will be drawn to it, fiercely. Do it the wrong way and draft copy can derail your design review.', isRead: true, isStarred: true, sentAt: 1251131930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Office suites', body: 'MS Word: From 2007 onwards typing!', isRead: true, isStarred: false, sentAt: 1453733930594 }
    ],
    sent: [
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Wassap?', body: 'Pick up!!!!', isRead: false, isStarred: false, sentAt: 1553143930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'The toppings', body: 'Lorem Ipsum is that huge, huge no no to forswear forever. Not so fast, I`d say, there are some redeeming factors in favor of greeking text, as its use is merely the symptom of a worse problem to take into consideration', isRead: false, isStarred: false, sentAt: 1555133130594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'where`s the content??', body: 'Not there yet? That`s not so bad, there`s dummy copy to the rescue', isRead: false, isStarred: false, sentAt: 1552133930794 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Chances are there wasn`t collaboration', body: 'True enough, but that`s not all that it takes to get things back on track.', isRead: false, isStarred: true, sentAt: 1551283960594 }
    ],
    drafts: [
        { id: getId(), address: 'no_reply@gmail.com', subject: 'I’ve heard the argument that “lorem ipsum” ', body: 'is effective in wireframing or design because it helps people focus on the actual layout', isRead: false, isStarred: false, sentAt: 1552333930594 },
        { id: getId(), address: 'no_reply@gmail.com', subject: 'Or maybe not', body: 'How about this: build in appropriate intersections and checkpoints between design and content. Accept that it’s sometimes okay to focus just on the content or just on the design.', isRead: false, isStarred: false, sentAt: 1553233930594 },
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