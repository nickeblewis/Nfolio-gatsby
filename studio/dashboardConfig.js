export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5cf51f967f717043b6bacbc3',
                  title: 'Sanity Studio',
                  name: 'Nfolio-gatsby-studio',
                  apiId: 'a0058785-3a8d-4b24-b4d2-0c0aa91f3b33'
                },
                {
                  buildHookId: '5cf51f9691d87e6b0ad98017',
                  title: 'Portfolio Website',
                  name: 'Nfolio-gatsby',
                  apiId: '884657e9-167c-4744-b94e-39fffddee269'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/nickeblewis/Nfolio-gatsby',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://Nfolio-gatsby.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
