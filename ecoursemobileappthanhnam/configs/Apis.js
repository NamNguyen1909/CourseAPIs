import axios from "axios"

// const BASE_URL="https://thanhduong.pythonanywhere.com/"
const BASE_URL="http://192.168.44.105:8000/"

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'register': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'lesson-details': (lessonId) => `/lessons/${lessonId}/`
}

export const authApis = (token) => {
    return axios.create({
        baseURL: BASE_URL, 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export default axios.create({
    baseURL: BASE_URL
});