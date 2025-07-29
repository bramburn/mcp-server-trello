//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const get_cards_by_list_idEval: EvalFunction = {
    name: 'get_cards_by_list_id Tool Evaluation',
    description: 'Evaluates the get_cards_by_list_id tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Can you fetch all cards from the Trello list with ID abc123?");
        return JSON.parse(result);
    }
};

const get_listsEval: EvalFunction = {
    name: 'get_lists Tool Evaluation',
    description: 'Evaluates the get_lists tool by retrieving all lists from a specified board',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please retrieve all lists from the board with ID 12345 and provide their names.");
        return JSON.parse(result);
    }
};

const get_recent_activityEvalFunction: EvalFunction = {
    name: 'get_recent_activity Tool Evaluation',
    description: 'Evaluates the ability to fetch recent activity on the Trello board',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Fetch the recent activity on the Trello board, limit it to 5 items");
        return JSON.parse(result);
    }
};

const add_card_to_listEval: EvalFunction = {
    name: 'add_card_to_listEval',
    description: 'Evaluates the add_card_to_list tool',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please add a new card named 'Demo Card' to the list with ID 'abc123', with a description of 'This is a test card', due date '2023-12-31T12:00:00Z', and a label 'priority'.");
        return JSON.parse(result);
    }
};

const update_card_detailsEval: EvalFunction = {
    name: 'update_card_details Evaluation',
    description: 'Evaluates the update_card_details tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please update the card with ID 'abc123' to have the name 'Updated Card Name', the description 'New description for the card', a due date of '2024-01-01T10:00:00Z', and labels ['priority','review'].");
        return JSON.parse(result);
    }
};

const get_card_commentsEval: EvalFunction = {
    name: 'get_card_comments Evaluation',
    description: 'Evaluates the get_card_comments tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please get all comments for the Trello card with ID 'abc123' and show them in chronological order.");
        return JSON.parse(result);
    }
};

const add_comment_to_cardEval: EvalFunction = {
    name: 'add_comment_to_card Evaluation',
    description: 'Evaluates the add_comment_to_card tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please add a comment 'This is a test comment' to the Trello card with ID 'abc123'.");
        return JSON.parse(result);
    }
};

const edit_card_commentEval: EvalFunction = {
    name: 'edit_card_comment Evaluation',
    description: 'Evaluates the edit_card_comment tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please edit the comment with ID 'comment123' on card 'abc123' to say 'This is an updated comment'.");
        return JSON.parse(result);
    }
};

const delete_card_commentEval: EvalFunction = {
    name: 'delete_card_comment Evaluation',
    description: 'Evaluates the delete_card_comment tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please delete the comment with ID 'comment123' from card 'abc123'.");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [
        get_cards_by_list_idEval,
        get_listsEval,
        get_recent_activityEvalFunction,
        add_card_to_listEval,
        update_card_detailsEval,
        get_card_commentsEval,
        add_comment_to_cardEval,
        edit_card_commentEval,
        delete_card_commentEval
    ]
};

export default config;

export const evals = [
    get_cards_by_list_idEval,
    get_listsEval,
    get_recent_activityEvalFunction,
    add_card_to_listEval,
    update_card_detailsEval,
    get_card_commentsEval,
    add_comment_to_cardEval,
    edit_card_commentEval,
    delete_card_commentEval
];