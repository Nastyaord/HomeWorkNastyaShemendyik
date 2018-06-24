var $ = jQuery.noConflict();

let allStudents = [];
var isSorted = false;

$(document).ready(function () {
   new Controller();
});

class Controller {
    constructor() {
        $('#jqueryTable').on('click', this.createView.bind(this));
    }

    createView() {
        this.view = new View();
        this.model = new Model();
        this.drawTable();
        this.addListeners();
    }

    addListeners() {
        $('#addStudent').on('click', this.actionAddStudents.bind(this));
        $('.head').on('click', this.actionSortTable.bind(this));
        $('.tableWithStudent').on('click', '.pictureEdit', this.actionEditStudent.bind(this));
        $('.blockWithFields').on('click', '.saveStudent', this.actionSaveStudent.bind(this));
        $('.blockWithFields').on('click', '.backStudent', this.actionBackSudent.bind(this));
    }

    actionAddStudents() {
        this.model.addStudent();
        if (this.model.validStudentData) {
            this.drawTable();
            this.view.clearFieldsOfStudents();
        } else {
            alert('Поля не заполнены');
        }
    }

    actionSortTable() {
        this.model.sortTable();
        this.drawTable();
    }

    drawTable() {
        this.view.drawTable(this.model.getStudents());
    }

    actionEditStudent(e) {
        let studentId = $(e.target).data('id');
        let student = this.model.getStudent(studentId);
        this.view.clearBlockWithSaveBack().fillFieldsOfStudents(student, studentId);
    }

    actionSaveStudent(e) {
        let studentId = $(e.target).data('id');
        this.model.saveStudent(studentId);
        if (this.model.validStudentData) {
            this.drawTable();
            this.view.clearBlockWithSaveBack();
        } else {
            alert('Поля не заполнены');
        }
    }

    actionBackSudent() {
        this.view.clearBlockWithSaveBack().clearFieldsOfStudents();

    }
}


class View {
    constructor() {
        this.createFieldsWithData();
        this.createHeadOfTable();
    }

    createFieldsWithData() {
        this.fieldsData = [
            {placeholder: 'Fill your name', name: 'name', id: ''},
            {placeholder: 'Fill your secondname', name: 'secondname', id: ''},
            {placeholder: 'Fill your age', name: 'age', id: ''},
            {placeholder: 'Fill your faculty', name: 'faculty', id: ''},
            {placeholder: 'Fill your course', name: 'course', id: ''},
            {placeholder: 'Fill any site', name: 'site', id: ''},
            {placeholder: 'Fill your phone', name: 'phone', id: 'phone'},
        ];
        this.block = $('#blockWithCarouselFirst');
        this.block.append('<div class="form-group blockWithFields"></div>');
        this.blockFields = $('#blockWithCarouselFirst > div');

        for (let i = 0; i < this.fieldsData.length; i++) {
            this.blockFields.append(`<input class="form-control fieldsOfStudents" 
                                            name="${this.fieldsData[i].name}"
                                            id="${this.fieldsData[i].id}"  
                                            placeholder="${this.fieldsData[i].placeholder}">`);
        }
        $("#phone").mask("(380) 99-999-99-99");
        this.block.append('<button class="btn btn-outline-info" id="addStudent">Add student</button>');
    }

    createHeadOfTable() {
        $('<table>', {
            class: 'tableWithStudent'
        }).appendTo('#blockWithCarouselFirst');

        $('<tr>').addClass('head').attr('id', 'tableHead').appendTo('.tableWithStudent');
        this.headBlock = $('.head');
        this.nameOFColums = [
            'id',
            'name',
            'secondname',
            'age',
            'faculty',
            'course',
            'site',
            'phone number',
            'edit'
        ];

        for (let i = 0; i < this.nameOFColums.length; i++) {
            this.headBlock.append(`<td>${this.nameOFColums[i]}</td>`);
        }
    };

    drawTable(allStudents) {
        $(".tableRow").remove();

        allStudents.forEach(function (valueStudents, keyStudents) {
            $('<tr>').addClass('tableRow').appendTo('.tableWithStudent');
            $('<td>')
                .text(keyStudents + 1)
                .appendTo('.tableWithStudent .tableRow:last-child');
            valueStudents.forEach(function (value, key) {
                $('<td>', {
                    name: $(this).attr('name')
                }).text(value)
                    .appendTo('.tableWithStudent .tableRow:last-child');
            });

            $('<i></i>').addClass('far fa-edit pictureEdit').attr('data-id', keyStudents)
                .appendTo('.tableWithStudent .tableRow:last-child');

        });
    }

    clearFieldsOfStudents() {
        $('.fieldsOfStudents').val('');
    }

    fillFieldsOfStudents(student, studentId) {
        let fieldsOfStudents = $('.fieldsOfStudents');
        for (let i = 0; i < student.length; i++) {
            fieldsOfStudents.eq(i).val(student[i]);
        }

        $('<div>').addClass('blockWithSaveBack')
            .appendTo('.blockWithFields');
        $('<i>').addClass('far fa-save saveStudent').attr('data-id', studentId)
            .appendTo('.blockWithSaveBack');
        $('.blockWithSaveBack').append('<i class="fas fa-undo backStudent"></i>');
    }

    clearBlockWithSaveBack() {
        $('.blockWithSaveBack').remove();
        return this;
    }
};

class Model {
    constructor() {
        this.data = {
            isSorted: false,
            allStudents: []
        };
        this.validStudentData = true;
        let students = localStorage.getItem('students');
        if (students !== null) {
            this.data = JSON.parse(students);
        }
    }

    getStudents() {
        return this.data.allStudents;
    }

    addStudent() {
        let student = this.getStudentData();
        if (this.validStudentData) {
            this.data.allStudents.unshift(student);
            this.saveToStorage();
        }
    }

    sortTable() {
        if (this.data.isSorted) {
            this.data.allStudents.reverse();
        } else {
            this.data.allStudents.sort(function (a, b) {
                if (a[0] > b[0]) {
                    return 1;
                }
                if (a[0] < b[0]) {
                    return -1;
                }
                return 0;
            });
            this.data.isSorted = true;
        }
        this.saveToStorage();
    }

    saveToStorage() {
        localStorage.setItem('students', JSON.stringify(this.data))
    }

    getStudent(studentId) {
        return this.data.allStudents[studentId];
    }

    saveStudent(studentId) {
        let student = this.getStudentData();
        if (this.validStudentData) {
            this.data.allStudents[studentId] = student;
            this.saveToStorage();
        }
    };

    getStudentData() {
        let student = [];
        let that = this;
        $('.fieldsOfStudents').each(function (i, elem) {
            if ($(this).val() == "") {
                that.validStudentData = false;
            }
            student.push($(this).val());
        });
        return student;
    }

}
