const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {format} = require('date-fns')

async function createProjectPages (graphql, actions, reporter) {
  const {createPage, createPageDependency} = actions
  const result = await graphql(`
    {
      allSanityProject(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/project/${slug}/`

      reporter.info(`Creating project page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: {id}
      })

      createPageDependency({path, nodeId: id})
    })
}

async function createBlogPages (graphql, actions, reporter) {
  const {createPage, createPageDependency} = actions
  const result = await graphql(`
    {
      allSanityPost(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const dateSegment = format(edge.node.publishedAt, 'YYYY/MM')
      const path = `/blog/${dateSegment}/${slug}/`

      reporter.info(`Creating blog page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/blog.js'),
        context: {id}
      })

      createPageDependency({path, nodeId: id})
    })
}
exports.createPages = async ({graphql, actions, reporter}) => {
  await createProjectPages(graphql, actions, reporter)
  await createBlogPages(graphql, actions, reporter)
}
