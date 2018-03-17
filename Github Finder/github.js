/**
 * Github user finder
 * @version 1.0
 * @author Andrew Fancett
 * 3-10-18
 */

class Github {
   constructor() {
     this.client_id = '3c062c76f5279cfd8f49';
     // Only for the purpose of this app, otherwise would never do this
     this.client_secret = 'd3d954ec3b25bffd4eece95038148d3f5cc905b8';
     this.repos_count = 5;
     this.repose_sort = 'created: asc';  
   }
   
   async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}