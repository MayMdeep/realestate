
//https://website.ultrawares.com/api/ online 
    const Host = "http://127.0.0.1:3005/api"


    export const api_Routes = {
        auth: {
          login: `${Host}/auth/login`,
          // Add other authentication routes here
        },
        users: {
          all: `${Host}/users`,
          pending: `${Host}/users/pending`,
          approve: (id) => `${Host}/users/approve/${id}`,
          ban: (id) => `${Host}/users/ban/${id}`,
          add: `${Host}/auth/register`,
        },
        logs: {
          all: `${Host}/logs`,
        },
        metrics: {
          dailyActiveUsers: `${Host}/metrics/daily-active-users`,
          weeklyActiveUsers: `${Host}/metrics/weekly-active-users`,
          weeklyPageViews: `${Host}/metrics/weekly-page-views`,
          dailyPageViews: `${Host}/metrics/daily-page-views`,
        },
      };