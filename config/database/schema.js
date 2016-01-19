var Schema = {
    // anywhere
    configs: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', nullable: false, maxlength: 255, unique: true},
        value: {type: 'text', nullable: false, fieldtype: 'tinytext'}
    },

    // anywhere
    logs: {
        id: {type: 'increments', nullable: false, primary: true},
        actor: {type: 'text', nullable: false, fieldtype: 'tinytext'},
        page: {type: 'text', nullable: false, fieldtype: 'tinytext'},
        action: {type: 'text', nullable: false, fieldtype: 'text'},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true}
    },

    //anywhere
    feedback: {
        id: {type: 'increments', nullable: false, primary: true},
        topic: {type: 'string', maxlength: 255, nullable: false},
        feedback: {type: 'text', nullable: false, fieldtype: 'tinytext'},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true}
    },

    // anywhere
    challenges: {
        id: {type: 'increments', nullable: false, primary: true}
    },

    // anywhere
    contests: {
        id: {type: 'increments', nullable: false, primary: true},
        begin: {type: 'dateTime', nullable: false},
        end: {type: 'dateTime', nullable: false},
        name: {type: 'text', fieldtype: 'text', nullable: false},
        description: {type: 'text', fieldtype: 'mediumtext', nullable: false},
        duration: {type: 'integer', nullable: false},
        good_answer: {type: 'decimal', precison: 2, nullable: false},
        no_answer: {type: 'decimal', precison: 2, nullable: false},
        wrong_answer: {type: 'decimal', precison: 2, nullable: false}
    },

    // anywhere
    subjects: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', nullable: false, maxlength: 255, unique: true},
        slug: {type: 'string', nullable: false, maxlength: 255, unique: true},
        exam_duration: {type: 'integer', nullable: false},
        questions_per_exam: {type: 'integer', nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true}
    },

    // after subjects
    chapters: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', maxlength: 255, unique: true},
        slug: {type: 'string', nullable: false, maxlength: 255, unique: true},
        number: {type: 'integer', nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
        subject_id: {type: 'integer', nullable: false, unsigned: true, references: 'subjects.id', onDelete: 'cascade'}
    },

    // anywhere
    modules: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', nullable: false, maxlength: 255, unique: true},
        slug: {type: 'string', nullable: false, maxlength: 255, unique: true}
    },

    // after chapters
    questions: {
        id: {type: 'increments', nullable: false, primary: true},
        wording: {type: 'text', nullable: false, fieldtype: 'mediumtext'},
        correction: {type: 'text', nullable: false, fieldtype: 'mediumtext'},
        calculator: {type: 'integer', nullable: false, defaultTo: 0},
        informations: {type: 'text', nullable: true, fieldtype: 'mediumtext', defaultTo: null},
        published: {type: 'integer', nullable: false, defaultTo: 0},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
        module_id: {type: 'integer', nullable: true, defaultTo: null, unsigned: true, references: 'modules.id', onDelete: 'set null'},
        challenge_id: {type: 'integer', nullable: true, defaultTo: null, unsigned: true, references: 'challenges.id', onDelete: 'set null'},
        contest_id: {type: 'integer', nullable: true, defaultTo: null, unsigned: true, references: 'contests.id', onDelete: 'set null'},
        chapter_id: {type: 'integer', nullable: false, unsigned: true, references: 'chapters.id', onDelete: 'cascade'}
    },

    // after questions
    answers: {
        id: {type: 'increments', nullable: false, primary: true},
        correct: {type: 'integer', nullable: false},
        content: {type: 'text', fieldtype: 'mediumtext'},
        question_id: {type: 'integer', nullable: false, unsigned: true, references: 'questions.id', onDelete: 'cascade'}
    },

    // formats
    formats: {
        id: {type: 'increments', nullable: false, primary: true},
        extension: {type: 'string', maxlength: 255, nullable: false, unique: true}
    },

    // after formats
    uploads: {
        id: {type: 'increments', nullable: false, primary: true},
        path: {type: 'text', nullable: false, fieldtype: 'text'},
        weight: {type: 'integer', nullable: false},
        format_id: {type: 'integer', nullable: true, unsigned: true, references: 'formats.id', onDelete: 'set null'}
    },

    // after images and questions
    images_questions: {
        id: {type: 'increments', nullable: false, primary: true},
        upload_id: {type: 'integer', nullable: false, unsigned: true, references: 'uploads.id', onDelete: 'cascade'},
        question_id: {type: 'integer', nullable: false, unsigned: true, references: 'questions.id', onDelete: 'cascade'}
    },

    // anywhere
    sections: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', maxlength: 255, nullable: false, unique: true},
        slug: {type: 'string', maxlength: 255, nullable: false, unique: true}
    },

    // after sections
    classes: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', maxlength: 255, nullable: false, unique: true},
        slug: {type: 'string', maxlength: 255, nullable: false, unique: true},
        section_id: {type: 'integer', nullable: false, unsigned: true, references: 'sections.id', onDelete: 'cascade'}
    },

    // anywhere
    roles: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', maxlength: 255, nullable: false, unique: true},
        slug: {type: 'string', maxlength: 255, nullable: false, unique: true}
    },

    // anywhere
    users: {
        id: {type: 'increments', nullable: false, primary: true},
        first_name: {type: 'string', maxlength: 100, nullable: false},
        last_name: {type: 'string', maxlength: 100, nullable: false},
        email: {type: 'string', maxlength: 255, nullable: false, unique: true},
        password: {type: 'text', fieldtype: 'text', nullable: false},
        role_id: {type: 'integer', nullable: false, unsigned: true, references: 'roles.id', onDelete: 'cascade', onUpdate: 'cascade'}
    },

    // after subjects and users
    subjects_teachers: {
        id: {type: 'increments', nullable: false, primary: true},
        subject_id: {type: 'integer', nullable: false, unsigned: true, references: 'subjects.id', onDelete: 'cascade'},
        user_id: {type: 'integer', nullable: false, unsigned: true, references: 'users.id', onDelete: 'cascade'},
    },

    // after classes and users
    classes_teachers: {
        id: {type: 'increments', nullable: false, primary: true},
        class_id: {type: 'integer', nullable: false, unsigned: true, references: 'classes.id', onDelete: 'cascade'},
        user_id: {type: 'integer', nullable: false, unsigned: true, references: 'users.id', onDelete: 'cascade'},
    },

    // after users and classes
    students: {
        id: {type: 'increments', nullable: false, primary: true},
        nickname: {type: 'text', nullable: false, fieldtype: 'tinytext'},
        level: {type: 'integer', nullable: false, defaultTo: 1},
        award_points: {type: 'integer', nullable: false, defaultTo: 0},
        color: {type: 'integer', nullable: false, defaultTo: 0},
        user_id: {type: 'integer', nullable: false, unsigned: true, references: 'users.id', onDelete: 'cascade'},
        class_id: {type: 'integer', nullable: false, unsigned: true, references: 'classes.id', onDelete: 'cascade'}
    },

    // after students
    friendships: {
        id: {type: 'increments', nullable: false, primary: true},
        student_id: {type: 'integer', nullable: false, unsigned: true, references: 'students.id', onDelete: 'cascade'},
        friend_id: {type: 'integer', nullable: false, unsigned: true, references: 'students.id', onDelete: 'cascade'}
    },

    // after users
    newsfeed: {
        id: {type: 'increments', nullable: false, primary: true},
        title: {type: 'text', nullable: false, fieldtype: 'mediumtext'},
        content: {type: 'text', nullable: false, fieldtype: 'mediumtext'},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
        user_id: {type: 'integer', nullable: false, unsigned: true, references: 'users.id', onDelete: 'cascade'}
    },

    // after students and questions
    markings: {
        id: {type: 'increments', nullable: false, primary: true},
        comment: {type: 'text', nullable: false, fieldtype: 'mediumtext'},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
        student_id: {type: 'integer', nullable: false, unsigned: true, references: 'students.id', onDelete: 'cascade'},
        question_id: {type: 'integer', nullable: false, unsigned: true, references: 'questions.id', onDelete: 'cascade'}
    },

    // after students and questions
    history: {
        id: {type: 'increments', nullable: false, primary: true},
        training: {type: 'integer', nullable: false},
        success: {type: 'integer', nullable: false},
        first_success: {type: 'integer', nullable: false},
        marked: {type: 'integer', nullable: false},
        double_assiduity: {type: 'integer', nullable: false},
        weeks_before_exam: {type: 'integer', nullable: false},
        student_id: {type: 'integer', nullable: false, unsigned: true, references: 'students.id', onDelete: 'cascade'},
        question_id: {type: 'integer', nullable: false, unsigned: true, references: 'questions.id', onDelete: 'cascade'}
    },

    // after challenges and students
    challenges_results: {
        id: {type: 'increments', nullable: false, primary: true},
        results_student: {type: 'integer', nullable: true, defaultTo: null},
        results_friend: {type: 'integer', nullable: true, defaultTo: null},
        student_retrieve_results: {type: 'integer', nullable: false, defaultTo: 0},
        friend_retrieve_results: {type: 'integer', nnullable: false, defaultTo: 0},
        date: {type: 'dateTime', nullable: false},
        challenge_id: {type: 'integer', nullable: false, unsigned: true, references: 'challenges.id', onDelete: 'cascade'},
        student_id: {type: 'integer', nullable: true, unsigned: true, references: 'students.id', onDelete: 'set null'},
        friend_id: {type: 'integer', nullable: true, unsigned: true, references: 'students.id', onDelete: 'set null'}
    },

    // after challenges_results
    challenges_pending: {
        id: {type: 'increments', nullable: false, primary: true},
        challenge_result_id: {type: 'integer', nullable: false, unsigned: true, references: 'challenges_results.id', onDelete: 'cascade'}
    },

    // after contests and students
    contests_results: {
        id: {type: 'increments', nullable: false, primary: true},
        points: {type: 'decimal', precison: 2, nullable: false},
        contest_id: {type: 'integer', nullable: false, unsigned: true, references: 'contests.id', onDelete: 'cascade'},
        student_id: {type: 'integer', nullable: false, unsigned: true, references: 'students.id', onDelete: 'cascade'}
    }
};

module.exports = Schema;
