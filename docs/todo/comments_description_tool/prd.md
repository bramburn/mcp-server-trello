[prd]
### PRD 1: Foundational Card Descriptions

**1\. Title & Overview**

- **Project:** Trello MCP Integration - Card Description Enhancements
    
- **Summary:** This phase will fix the description functionality in the existing `add_card_to_list` tool and introduce new tools to `update_card_description` and `append_to_card_description`. This provides users with full control over the textual content of their Trello cards.
    

**2\. Goals & Success Metrics**

- **Business Objectives:**
    
    - Improve the reliability and completeness of the core card creation feature.
        
    - Increase user satisfaction by providing more granular control over card details.
        
- **User Success Metrics:**
    
    - Reduce user-reported issues related to card descriptions by 90%.
        
    - See a 25% adoption rate for the new `update_card_description` and `append_to_card_description` tools within two months of release.
        

**3\. User Personas**

- **Project Manager:** Needs to create detailed tasks and update them with new information as projects evolve.
    
- **Team Member:** Wants to add notes, findings, or updates to card descriptions without overwriting existing content.
    

**4\. Requirements Breakdown**

| 
Phase

 | 

Sprint

 | 

User Story

 | 

Acceptance Criteria

 | 

Duration

 |
| --- | --- | --- | --- | --- |
| 

Phase 1: Descriptions

 | 

Sprint 1

 | 

As a user, I want the `description` field in the `add_card_to_list` tool to work correctly so that I can create detailed cards.

 | 

1\. The `add_card_to_list` tool correctly uses the `desc` parameter in the `POST /1/cards` API call. <br> 2. When a `description` is provided, it appears correctly on the created Trello card. <br> 3. The `validateAddCardRequest` function in `src/validators.ts` is updated to correctly handle the optional `description` field. <br> 4. The `addCard` method in `src/trello-client.ts` is confirmed to pass the `desc` parameter.

 | 

2 weeks

 |
| 

Phase 1: Descriptions

 | 

Sprint 2

 | 

As a user, I want a new tool to update the entire description of a card so I can make substantial changes.

 | 

1\. A new tool `update_card_description` is created. <br> 2. The tool uses the `PUT /1/cards/{id}` endpoint. <br> 3. It accepts `card_id` and `description` as required parameters. <br> 4. The card's description in Trello is completely replaced with the new content. <br> 5. A confirmation of success is returned.

 | 

2 weeks

 |
| 

Phase 1: Descriptions

 | 

Sprint 3

 | 

As a user, I want a new tool to append text to a card's description so I can add updates without losing existing information.

 | 

1\. A new tool `append_to_card_description` is created. <br> 2. The tool first fetches the existing card description using `GET /1/cards/{id}?fields=desc`. <br> 3. It appends the new text (with appropriate newlines) to the existing description. <br> 4. It updates the card using the `PUT /1/cards/{id}` endpoint with the full, combined description. <br> 5. A confirmation of success is returned.

 | 

2 weeks

 |

**5\. Timeline & Sprints**

- **Sprint 1: Fix Card Creation Description (2 weeks)**
    
    - **Focus:** Debug and fix the description parameter in the existing `add_card_to_list` tool.
        
- **Sprint 2: Implement Description Update Tool (2 weeks)**
    
    - **Focus:** Develop and test the `update_card_description` tool.
        
- **Sprint 3: Implement Description Append Tool (2 weeks)**
    
    - **Focus:** Develop and test the `append_to_card_description` tool, including the logic for fetching and combining text.
        
- **Total Duration for Phase 1:** 6 weeks
    

**6\. Risks & Assumptions**

- **Risks:**
    
    - The `append` functionality could lead to race conditions if multiple users try to append to the same card simultaneously. The current implementation will be atomic per operation but not across users.
        
    - Large description fields might hit Trello API size limits, requiring error handling for such cases.
        
- **Assumptions:**
    
    - The existing `TrelloClient` in `src/trello-client.ts` can be easily extended with methods for these new tools.
        
    - The Trello API's behavior for updating descriptions via `PUT` is consistent and reliable.
        

**7\. Success Metrics & Measurement**

- **Primary Metrics:**
    
    - Monitor the usage logs for `add_card_to_list` to ensure the `description` parameter is being used successfully.
        
    - Track the adoption and usage frequency of `update_card_description` and `append_to_card_description`.
        
- **Measurement Method:**
    
    - Internal logging of tool calls, parameters, and success/failure rates.

### PRD 2: Foundational Label Viewing

**1\. Title & Overview**

- **Project:** Trello MCP Integration - Label Viewing Capabilities
    
- **Summary:** This phase introduces read-only functionality for Trello labels. It will provide two new tools: `get_board_labels` to list all available labels on the active board, and `get_card_labels` to view the specific labels applied to a card. This lays the groundwork for future label management.
    

**2\. Goals & Success Metrics**

- **Business Objectives:**
    
    - Enhance the contextual information available to users within the MCP.
        
    - Provide the necessary foundation for adding label management tools in a subsequent phase.
        
- **User Success Metrics:**
    
    - The `get_board_labels` and `get_card_labels` tools are used in at least 15% of active user sessions within the first month.
        
    - A significant number of `add_labels_to_card` requests (from Phase 3) are preceded by a call to `get_board_labels`, indicating users are using the tools in a logical workflow.
        

**3\. User Personas**

- **Project Manager:** Needs to see what labels are available for a project (board) to ensure consistent categorization of tasks.
    
- **Team Member:** Wants to quickly see the labels on a card to understand its priority, status, or category without leaving the MCP.
    

**4\. Requirements Breakdown**

| 
Phase

 | 

Sprint

 | 

User Story

 | 

Acceptance Criteria

 | 

Duration

 |
| --- | --- | --- | --- | --- |
| 

Phase 2: Label Viewing

 | 

Sprint 4

 | 

As a user, I want to view all available labels on the current board so I know what labels I can use.

 | 

1\. A new tool `get_board_labels` is created. <br> 2. The tool uses the `GET /1/boards/{id}/labels` endpoint. <br> 3. It uses the currently active `boardId` from the `TrelloClient`. <br> 4. The tool returns a list of label objects, each containing `id`, `name`, and `color`. <br> 5. An error is returned if no active board is set.

 | 

2 weeks

 |
| 

Phase 2: Label Viewing

 | 

Sprint 5

 | 

As a user, I want to see the labels on a specific card to understand its context.

 | 

1\. A new tool `get_card_labels` is created. <br> 2. The tool uses the `GET /1/cards/{id}?fields=labels` endpoint. <br> 3. It accepts a `card_id` as a required parameter. <br> 4. The tool returns a list of label objects applied to that card. <br> 5. If the card has no labels, an empty list is returned.

 | 

2 weeks

 |

**5\. Timeline & Sprints**

- **Sprint 4: Board Label Listing (2 weeks)**
    
    - **Focus:** Implement and test the `get_board_labels` tool.
        
- **Sprint 5: Card Label Viewing (2 weeks)**
    
    - **Focus:** Implement and test the `get_card_labels` tool.
        
- **Total Duration for Phase 2:** 4 weeks
    

**6\. Risks & Assumptions**

- **Risks:**
    
    - Boards with a very large number of labels could result in a large payload from the `get_board_labels` tool, potentially impacting performance.
        
- **Assumptions:**
    
    - The Trello API provides a straightforward way to fetch labels for both boards and cards.
        
    - The user's API token has the necessary read permissions for labels.
        

**7\. Success Metrics & Measurement**

- **Primary Metrics:**
    
    - Track the call volume for `get_board_labels` and `get_card_labels`.
        
    - Analyze user workflows to see if `get_board_labels` is called before label modification tools (in the next phase).
        
- **Measurement Method:**
    
    - Internal logging of tool usage and success rates.


### PRD 3: Label Management

**1\. Title & Overview**

- **Project:** Trello MCP Integration - Card Label Management
    
- **Summary:** This phase builds upon the label viewing functionality by introducing a new tool, `add_labels_to_card`, allowing users to attach one or more existing labels to a Trello card.
    

**2\. Goals & Success Metrics**

- **Business Objectives:**
    
    - Provide users with the ability to categorize and prioritize tasks directly from the MCP.
        
    - Increase the value of the Trello integration by adding a key interactive feature.
        
- **User Success Metrics:**
    
    - The `add_labels_to_card` tool is used on 20% of newly created cards within two months of launch.
        
    - User feedback indicates a high level of satisfaction with the new label management capabilities.
        

**3\. User Personas**

- **Project Manager:** Wants to apply priority labels (e.g., "High Priority", "Urgent") to cards to direct team focus.
    
- **Team Member:** Needs to add status labels (e.g., "In Progress", "Blocked") to cards as they work on them.
    

**4\. Requirements Breakdown**

| 
Phase

 | 

Sprint

 | 

User Story

 | 

Acceptance Criteria

 | 

Duration

 |
| --- | --- | --- | --- | --- |
| 

Phase 3: Label Mgmt

 | 

Sprint 6

 | 

As a user, I want to add one or more existing labels to a card to categorize it.

 | 

1\. A new tool `add_labels_to_card` is created. <br> 2. The tool uses the `POST /1/cards/{id}/idLabels` endpoint. <br> 3. It accepts a `card_id` and a `label_ids` (an array of strings) as required parameters. <br> 4. The tool successfully associates the specified labels with the card. <br> 5. The tool returns the new list of all labels on the card.

 | 

2 weeks

 |

**5\. Timeline & Sprints**

- **Sprint 6: Add Labels to Card (2 weeks)**
    
    - **Focus:** Develop and thoroughly test the `add_labels_to_card` tool, including handling single and multiple label additions.
        
- **Total Duration for Phase 3:** 2 weeks
    

**6\. Risks & Assumptions**

- **Risks:**
    
    - Users might try to add a label that doesn't exist on the board. The tool must handle this gracefully by relying on the Trello API to reject invalid label IDs.
        
- **Assumptions:**
    
    - Users will use the `get_board_labels` tool (from Phase 2) to get valid `label_ids` before calling this tool.
        
    - The Trello API correctly handles adding multiple labels in a single request.
        

**7\. Success Metrics & Measurement**

- **Primary Metrics:**
    
    - Track the adoption and frequency of use for the `add_labels_to_card` tool.
        
    - Measure the average number of labels added per call.
        
- **Measurement Method:**
    
    - Internal logging and analytics on tool usage.

[backlog template]

```
<prompt>
  <purpose>
    You are an expert AI Project Manager and Senior Software Architect. Your primary role is to analyze user requirements, Product Requirement Documents (PRDs), and an existing codebase to generate a comprehensive, step-by-step implementation plan. You will break down features into a detailed backlog, including user stories, atomic actions, file references, and testing criteria, following a structured and iterative process.
  </purpose>
  <instructions>
    <instruction>
      **Phase 1: Analysis and Objective Setting**
      1.  Thoroughly analyze all attached documents within [[user-provided-files]]. Pay special attention to:
          - A file named `repomix-output-all.md` or similar, which contains the entire application's code structure.
          - A Product Requirement Document (PRD) or a requirements file.
      2.  From the [[user-prompt]], identify the specific sprint, feature, or section that requires implementation.
      3.  Define the high-level objective for implementing this feature based on the PRD and user prompt.
    </instruction>
    <instruction>
      **Phase 2: Iterative Backlog Generation**
      For each distinct requirement or user story within the specified sprint/feature, you will perform the following loop:
      1.  **Draft User Story**: Write a clear user story with a role, goal, and outcome.
      2.  **Define Workflow**: Outline the high-level workflow needed for implementation.
      3.  **Codebase Review**: Search the `repomix` file to identify existing code, components, or files that can be reused or need to be modified.
      4.  **Identify File Changes**: Determine the exact list of files that need to be created or amended.
      5.  **Detail Actions to Undertake**: Create a granular, step-by-step list of actions. Each action must be atomic and include:
          - `Filepath`: The full path to the file being changed.
          - `Action`: A description of the change (e.g., "Add new method `calculateTotal` to class `Billing`").
          - `Implementation`: The precise code snippet to be added or modified.
          - `Imports`: Any new import statements required for the change.
      6.  **Define Acceptance Criteria**: Write clear, measurable criteria for the user story to be considered complete.
      7.  **Outline Testing Plan**: Propose specific test cases to validate the functionality.
      8.  **Review and Refine**: Briefly review the drafted user story and actions to ensure they align with the main objective before moving to the next story.
    </instruction>
    <instruction>
      **Phase 3: Final Output Compilation**
      1.  Consolidate the entire backlog into separate, well-formatted Markdown canvas document.
      2.  Use clear headings and subheadings as demonstrated in the examples.
      3.  Ensure the final output is logical, easy to follow, and provides a clear roadmap for a developer to implement the changes.
        Note: please ensure each backlog is in a separate canvas document.
    </instruction>
  </instructions>
  <examples>
    <example>
      <user-request>
        Focus on the "User Logout" feature. The PRD specifies a logout button should be added to the main navigation bar. The `repomix` file shows a React component called `Navbar.js`.
      </user-request>
      <output>
        ### User Story 1: User Logout
        **As a** logged-in user, **I want to** click a "Logout" button in the navigation bar, **so that** I can securely end my session.

        **Actions to Undertake:**
        1.  **Filepath**: `src/components/Navbar.js`
            -   **Action**: Add a logout button element.
            -   **Implementation**: `<button onClick={handleLogout}>Logout</button>`
            -   **Imports**: `import { useAuth } from '../contexts/AuthContext';`
        2.  **Filepath**: `src/components/Navbar.js`
            -   **Action**: Implement the `handleLogout` function.
            -   **Implementation**: `const { logout } = useAuth(); const handleLogout = () => { logout(); };`
            -   **Imports**: None.
        3.  **Filepath**: `src/contexts/AuthContext.js`
            -   **Action**: Ensure a `logout` function exists that clears the user's session.
            -   **Implementation**: `const logout = () => { setUser(null); localStorage.removeItem('authToken'); };`
            -   **Imports**: None.

        **Acceptance Criteria:**
        -   A "Logout" button is visible in the Navbar.
        -   Clicking the button clears the user's session and redirects to the login page.

        **Testing Plan:**
        -   **Test Case 1**: Log in and verify the "Logout" button appears.
        -   **Test Case 2**: Click the "Logout" button and confirm the user is redirected and the session is cleared.
      </output>
    </example>
    <example>
      <user-request>
        Implement the "Character Counter" for the new post input field as per the PRD. The `repomix` file shows a component at `src/features/posts/NewPost.js`.
      </user-request>
      <output>
        ### User Story 2: Post Character Counter
        **As a** user writing a new post, **I want to** see a character counter below the text input, **so that** I know how close I am to the character limit (280).

        **Actions to Undertake:**
        1.  **Filepath**: `src/features/posts/NewPost.js`
            -   **Action**: Add a state variable to track the input text.
            -   **Implementation**: `const [content, setContent] = useState('');`
            -   **Imports**: `import { useState } from 'react';`
        2.  **Filepath**: `src/features/posts/NewPost.js`
            -   **Action**: Update the `textarea` to use the new state.
            -   **Implementation**: `<textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength="280" />`
            -   **Imports**: None.
        3.  **Filepath**: `src/features/posts/NewPost.js`
            -   **Action**: Add a character counter display element.
            -   **Implementation**: `<p>{content.length} / 280</p>`
            -   **Imports**: None.

        **Acceptance Criteria:**
        -   As the user types in the textarea, a counter below it updates in real-time.
        -   The counter format is "current_length / 280".
        -   The user cannot type more than 280 characters.

        **Testing Plan:**
        -   **Test Case 1**: Type 50 characters and verify the counter shows "50 / 280".
        -   **Test Case 2**: Clear the text and verify the counter shows "0 / 280".
        -   **Test Case 3**: Try to paste 300 characters and verify only 280 are accepted.
      </output>
    </example>
    <example>
      <user-request>
        Create a new "Settings" page that is currently just a placeholder. The PRD states it should be accessible from the main app router.
      </user-request>
      <output>
        ### User Story 3: Create Settings Page
        **As a** user, **I want to** navigate to a "Settings" page, **so that** I can manage my account preferences in the future.

        **List of Files to be Created:**
        -   `src/pages/Settings.js`

        **Actions to Undertake:**
        1.  **Filepath**: `src/pages/Settings.js` (New File)
            -   **Action**: Create a placeholder React component for the Settings page.
            -   **Implementation**: `import React from 'react';

const Settings = () => {
  return <h1>Settings Page</h1>;
};

export default Settings;`
            -   **Imports**: `import React from 'react';`
        2.  **Filepath**: `src/App.js`
            -   **Action**: Add a new route for the Settings page.
            -   **Implementation**: `<Route path="/settings" element={<Settings />} />`
            -   **Imports**: `import Settings from './pages/Settings';`

        **Acceptance Criteria:**
        -   Navigating to the `/settings` URL renders the "Settings Page" heading.
        -   The application does not crash.

        **Testing Plan:**
        -   **Test Case 1**: Manually navigate to `/settings` in the browser and verify the page loads with the correct heading.
      </output>
    </example>
  </examples>
  <sections>
    <user-provided-files>
       see attached markdown files. Usually we would include the repomix file usually named 'repomix-output-all.xml' or .md or similar filename which would contain the concatenated source code and structure of the application.
	   I would also provide the prd, or high level detail of the requirement.
    </user-provided-files>
    <user-prompt>
        Following the PRD: ` ` you now have to generate backlogs for each sprint item in that PRD. ensure you undertake a detail review, web search (to add relevant api information, and implementation) before you produce each backlog. Ensure we have one new canvas for each backlog sprint item. Ensure you review and markdown or xml repomix files attached to get an understanding of the existing context.
        Create new canvas doc for sprint X and X backlog
    </user-prompt>
  </sections>
</prompt>
```

[implementation guidance template]

```
how do i implement the sprints x to x , undertake a full websearch, determine which content is suitable and then, provide code example, api information and further guidance on using external api/packages to complete the task. Review 'prd', (if available) the existing code inin your analysis. Ensure each guide is produced in their own individual canvas document
```

<instructions>

<instruction>
Step 1: Initial Repository Context Analysis.
Begin by thoroughly analyzing the entire codebase in the repository. Perform a static analysis to understand the project structure, common patterns, and key architectural components. Identify the main folders, file naming conventions, and the purpose of the primary modules. This initial, broad review is crucial for contextual understanding before focusing on specific items.
</instruction>
<instruction>
Step 2: Deconstruct the Product Requirements Document (PRD).
Review the entire PRD and identify each distinct feature, task, or user story. Create a list of these individual "sprint items". This list will serve as your master checklist for the documents you need to create.
</instruction>
<instruction>
Step 3: Begin Processing the First Sprint Item.
Select the first sprint item from the list you created in Step 2. All subsequent steps until the final instruction will be performed for this single item.
</instruction>
<instruction>
Step 4: Conduct a Detailed Review of the Sprint Item.
Focus exclusively on the selected sprint item. Read its description, acceptance criteria, and any associated notes in the PRD. Clearly define the scope and objectives of this specific item.
</instruction>
<instruction>
Step 5: Perform Targeted Web and Repository Searches.
Based on the sprint item's requirements, conduct a web search to find relevant API documentation, libraries, best practices, or potential implementation examples. Simultaneously, search within the existing codebase for any files, functions, or modules that are related to the item. This connects external research with internal context.
</instruction>
<instruction>
Step 6: Create the Backlog Markdown File.
Locate the file named [backlog template]. Create a new markdown file for the sprint item. Name it appropriately (e.g., backlog_sprint_item_name.md). Populate this new file by filling out the template using the information gathered from the PRD review (Step 4) and your research (Step 5).
</instruction>
<instruction>
Step 7: Create the Implementation Guidance Markdown File.
Locate the file named [implementation guidance template]. Create another new markdown file. Name it to correspond with the backlog item (e.g., implementation_sprint_item_name.md). Populate this file by filling out the template, focusing on the technical details, code-level suggestions, relevant API endpoints, and file paths you discovered during your searches (Step 5).
</instruction>
<instruction>
Step 8: Save the New Files.
Ensure both newly created markdown files (the backlog and the implementation guidance) are saved in the same folder where this prompt file is located.
</instruction>
<instruction>
Step 9: Repeat for All Remaining Sprint Items.
If there are more sprint items on your list from Step 2, return to Step 3 and repeat the entire process (Steps 3 through 8) for the next item. Continue this loop until a backlog and an implementation guidance file have been created for every single item on your list.
</instruction>
<instruction>
Step 10: Final Verification.
Once all sprint items have been processed, perform a final check. Verify that for every item identified in the PRD, there are exactly two corresponding markdown files (one backlog, one implementation guidance) located in the correct folder.
</instruction>

</instructions>

<notes>
<note>
Note 1: Template Adherence.
You must strictly use the provided [backlog template] and [implementation guidance template] for all generated files. Do not deviate from their structure.
</note>
<note>
Note 2: One-to-One File-to-Item Ratio.
For every single sprint item identified in the PRD, you must produce exactly one backlog markdown file and one implementation guidance markdown file.
</note>
<note>
Note 3: Naming Conventions.
All new files must follow a consistent naming convention that clearly links them to the sprint item, for example: backlog_sprint_item_name.md and implementation_sprint_item_name.md.
</note>
<note>
Note 4: File Location.
All generated markdown files must be created and saved in the exact same folder as the prompt file.
</note>
<note>
Note 5: Atomic Processing.
Each sprint item must be processed individually and completely (from detailed review to file creation) before moving to the next item. Do not batch-process steps.
</note>
<note>
Note 6: Foundational Analysis.
The initial repository context analysis (Step 1) is mandatory and must be completed before processing any sprint items. This step is critical for providing relevant and accurate guidance.
</note>
</notes>