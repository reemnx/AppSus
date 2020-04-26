import storageServices from '../../../services/storageService.js';
import getRandomInt from '../services/getRandomInt.js';

export default {
    getEmails,

}

const KEY = 'emails';

let gEmails = storageServices.loadFromStorage(KEY) || {
    income: [
        { id: getId(), subject: 'Wassap?', body: 'Pick up1!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up2!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up3!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up4!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up5!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up6!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up7!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up8!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up9!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up10!', isRead: false, sentAt: 1551133930594 }
    ],
    sent: [
        { id: getId(), subject: 'Wassap?', body: 'Pick up14!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up15!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up16!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up17!', isRead: false, sentAt: 1551133930594 }
    ],
    drafts: [
        { id: getId(), subject: 'Wassap?', body: 'Pick up18!', isRead: false, sentAt: 1551133930594 },
        { id: getId(), subject: 'Wassap?', body: 'Pick up19!', isRead: false, sentAt: 1551133930594 },
    ]
}

function getId() {
    let key = '';
    for (let i = 0; i < 10; i++){
        key += String.fromCharCode(getRandomInt(33, 127));
    }
    return key;
}

function getEmails(filter) {
    const mails = gEmails[filter].slice()
    return Promise.resolve(mails);
}