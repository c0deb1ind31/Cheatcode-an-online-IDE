import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}/api`,
});

async function getUser(google_id: string) {
  return await api.get(`/user/${google_id}`);
}

async function createUser(
  google_id: string,
  user_name: string,
  email: string
) {
  return await api.post(`/user/create`, {
    gid: google_id,
    username: user_name,
    email: email,
  });
}

async function getProblem(problem_id: number) {
  return (await api.get(`/problems/${problem_id}`)).data;
}

async function getProblemSubmissions(problem_id: number) {
  return (await api.get(`/submissions/all_submissions/${problem_id}`)).data;
}

async function getProblemUserSubmissions(user_id: string, problem_id: number) {
  return (
    await api.get(`/submissions/user_submissions/${problem_id}/user/${user_id}`)
  ).data;
}

async function submitSolution(
  user_id: string,
  problem_id: number,
  lang: string,
  code: string,
  submission_type: "run" | "submit"
) {
  return (
    await api.post(`/submissions/submit/${problem_id}`, {
      user_id,
      lang,
      code,
      submission_type,
    })
  ).data;
}

async function getSubmissionStatus(sub_id: string) {
  return (await api.get(`/submissions/${sub_id}/check`)).data;
}
export const apiServices = {
  getProblemSubmissions,
  getProblemUserSubmissions,
  submitSolution,
  getSubmissionStatus,
  getProblem,
  getUser,
  createUser
};
