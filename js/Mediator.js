class baseBlock {
    send(message) {
        this.mediator.send(message, this);
    }
    receive(message, from) {
        console.log(from.block + " to " + this.block + ": " + message);
        if (message == 'open') {

        }
    }
};

class StudentsList extends baseBlock{
    constructor (block){
       super();

       this.students = [];
       this.block = block;
       this.mediator;

       this.getStudentsData();
       this.drawStudentsList();
       this.addListeners();
    }

    getStudentsData(){
        let allStudents = localStorage.getItem('students');
        allStudents = JSON.parse(allStudents);
        let students = [];
        allStudents.allStudents.forEach(function (elem) {
            let index = elem[4];
            if (students[index] === undefined){
                students[index] = [];
            }
            students[index].push(elem);
        });
        this.students = students;
    }

    drawStudentsList(){
        let that = this;
        this.students.forEach(function (elem, index) {
            $('<ul>')
                .text(index)
                .appendTo(that.block);
            elem.forEach(function (elem, index) {
                $('<li>')
                    .text(elem[0])
                    .appendTo(that.block + ' ul:last-child');
            });
        });
    }

    addListeners(){
        $(this.block + ' ul').on('click', this.openList.bind(this));
    }

    openList(e){
        $(e.target)
            .toggleClass('open');
        this.send('open');
    }
}

var Mediator = function() {
    var participants = {};

    return {
        register: function(participant) {
            participants[participant.block] = participant;
            participant.mediator = this;
        },

        send: function(message, from) {
            for (key in participants) {
                if (participants[key] !== from) {
                    participants[key].receive(message, from);
                }
            }
        }

    };
};


let mediator = new Mediator();

let topStudentsList =  new StudentsList('#topStudentsList');
let rightStudentsList =  new StudentsList('#rightStudentsList');

mediator.register(topStudentsList);
mediator.register(rightStudentsList);
