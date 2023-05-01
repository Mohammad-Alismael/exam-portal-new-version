export default class CommentSelector{
    static getPostCommentBtn(){
        return cy.get('[data-cy="post-comment-btn"]')
    }
    static getCommentTextField(){
        return cy.get('.makeStyles-commentContainerOpen-63 > [style="display: inline;"] > .makeStyles-addComment-78 > [data-cy="post-comment-textfield"]')
    }
    static getCourseCard(){
        return cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardActionArea-root > .MuiCardMedia-root')
    }
    static getCommentTag(){
        return cy.get(':nth-child(1) > [data-cy="comment-btn"]')
    }
}