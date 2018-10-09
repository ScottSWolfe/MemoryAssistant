import firebase from 'firebase'
import ApiKeys from './constants/ApiKeys';

export default class api {

    constructor() {
    }

    writeTodo(days, UID, completed, deadline, name, repeat){
        let newTodo = {
            days: days,
            uid: UID,
            repeat: repeat,
            deadline: deadline,
            date_created: new Date().getTime(),
            name: "test",
            completed: true,
            last_updated: new Date().getTime()
        }
        firebase.database().ref('todos/').push(newTodo
        ).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }

    readTodos(UID) {
        firebase.database().ref('todos/').orderByChild("uid")
        .equalTo(20).once('value', function(snapshot) {
            snapshot.forEach(function(child) {
                console.log(child.key, child.val().bio);
            });
        });
    }
}