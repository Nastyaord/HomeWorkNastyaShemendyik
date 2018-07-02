class baseBlock {
    constructor(){
        this.students = [];
        let allStudents = localStorage.getItem('students');
        allStudents = JSON.parse(allStudents);
        this.students = allStudents.allStudents;
    }


    send(message) {
        this.mediator.send(message, this);
    }
    receive(message, from) {
        // console.log(from.block + " to " + this.block + ": " + message);

        if (this[`${message[0]}`] !== undefined) {
            this[`${message[0]}`](message[1]);
        }
    }
};

class StudentsList extends baseBlock{
    constructor (block){
       super();

       this.block = block;
       this.mediator;
       this.sortStudents();
       this.drawStudentsList();
       this.addListeners();
    }

    sortStudents(){
        let students = [];
        this.students.forEach(function (elem, studentId) {
            let index = elem[4];
            if (students[index] === undefined){
                students[index] = [];
            }
            elem.push(studentId);
            students[index].push(elem);
        });
        this.students = students;
    }

    drawStudentsList(){
        let that = this;
        this.students.forEach(function (elem, index) {
            $('<ul>')
                .text(index)
                .appendTo(that.block)
                .attr('id', index);
            elem.forEach(function (elem, index) {
                $('<li>')
                    .text(elem[0])
                    .attr('id', elem[7])
                    .appendTo(that.block + ' ul:last-child');
            });
        });
    }

    addListeners(){
        $(this.block + ' ul').on('click', this.toggleList.bind(this));
        $(this.block + ' ul > li').on('click', this.showStudent.bind(this));
    }

    toggleList(e){
        let id = $(e.target)
            .toggleClass('open')
            .attr('id');
        let message = ['toggleOtherList', id];
        this.send(message);
    }

    toggleOtherList(id){
       $(this.block + ' ul[id = ' + id +']')
           .toggleClass('open');
    }

    showStudent(e){
        e.stopPropagation();
        let studentId = $(e.target)
            .attr('id');

        let message = ['showStudentsData', studentId];
        this.send(message);
    }

    clearStudentsData(){
        $(this.block).empty();
    }
}

class StudentsImages extends baseBlock{
    constructor(block){
        super();

        this.block = block;
        this.clearStudentsData();
    }

    showStudentsData(studentId){
        let nameOFColums = [
            'secondname',
            'name',
            'age',
            'faculty',
            'course',
            'site',
            'phone number',
        ];
        let block = this.block;
        this.students[studentId].forEach(function (elem, key) {
            $(block).append(`<div> ${nameOFColums[key]} : ${elem}</div>`);
        });
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

let studentsImage = new StudentsImages('#studentsData');

mediator.register(topStudentsList);
mediator.register(rightStudentsList);

mediator.register(studentsImage);
