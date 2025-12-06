// ================================
// USER & AUTH TYPES
// ================================

export interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    token?: string;
    role?: "student" | "admin";
    enrolledCourses?: string[];
    createdAt?: string;
}

export interface IAuthResponse {
    user: IUser;
    token: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface ISignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface IUpdateProfilePayload {
    name?: string;
    avatar?: string;
    password?: string;
}


// ================================
// COURSE TYPES
// ================================

export interface ICourse {
    slug: string;
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    price: number;
    level: "beginner" | "intermediate" | "advanced";
    instructor: string;
    rating: number;
    totalLessons: number;
    lessons: ILesson[];
    reviews: IReview[];
    createdAt?: string;
}

export interface ILesson {
    description: string;
    _id: string;
    title: string;
    duration: number;
    videoUrl: string;
    order: number;
    isLocked?: boolean;
}

export interface ICourseResponse {
    courses: ICourse[];
}

export interface ICourseDetailsResponse {
    course: ICourse;
}


// ================================
// VIDEO PLAYER TYPES
// ================================

export interface IPlayerState {
    currentCourseId: string | null;
    currentLessonId: string | null;
    isPlaying: boolean;
    videoUrl: string | null;
}

export interface IPlayLessonPayload {
    courseId: string;
    lessonId: string;
    videoUrl: string;
}


// ================================
// QUIZ TYPES
// ================================

export interface IQuiz {
    totalMarks: number;
    _id: string;
    courseId: string;
    title: string;
    totalQuestions: number;
    questions: IQuestion[];
}

export interface IQuestion {
    _id: string;
    question: string;
    options: string[];
    answer: string;
}

export interface ISubmitQuizPayload {
    quizId: string;
    answers: {
        questionId: string;
        selected: string;
    }[];
}

export interface IQuizResult {
    score: number;
    total: number;
    correctAnswers: number;
    wrongAnswers: number;
}


// ================================
// REVIEW TYPES
// ================================

export interface IReview {
    _id: string;
    user: IUser;
    rating: number;
    comment: string;
    createdAt?: string;
}

export interface IAddReviewPayload {
    courseId: string;
    rating: number;
    comment: string;
}


// ================================
// PAYMENT TYPES
// ================================

export interface ICreateOrderResponse {
    orderId: string;
    amount: number;
    currency: string;
}

export interface IVerifyPaymentPayload {
    orderId: string;
    paymentId: string;
    signature: string;
}

export interface IPaymentStatusResponse {
    success: boolean;
}


// ================================
// UI & STATE TYPES
// ================================

export interface IToastMessage {
    type: "success" | "error" | "info";
    message: string;
}

export interface IApiError {
    error: string;
    message: string;
    statusCode: number;
}


// ================================
// GENERAL API RESPONSE TYPES
// ================================

export interface IApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}


export interface IChapter {
    _id: string;
    lessons: ILesson[];
    description: string;
    title: string;
    error: string;
    message: string;
    statusCode: number;
}