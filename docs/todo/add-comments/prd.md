[prd]
### PRD 1: Foundational MVP - Card Commenting Functionality

**1\. Title & Overview**

- **Project:** Trello MCP Integration - Card Commenting
    
- **Summary:** This project will introduce the foundational features for interacting with comments on Trello cards directly through the MCP. This includes the ability to read existing comments and add new ones, providing a more complete in-tool experience.
    

**2\. Goals & Success Metrics**

- **Business Objectives:** Increase user engagement and stickiness by centralizing more Trello functionality within the MCP. Reduce the need for users to switch between the MCP and the Trello UI for basic collaboration.
    
- **User Success Metrics:**
    
    - At least 50% of weekly active users utilize either the read or add comment feature within the first month of launch.
        
    - The average number of user sessions that include a comment-related action increases by 25%.
        
    - A minimum of 500 comments are successfully posted via the MCP within the first two months.
        

**3\. User Personas**

- **Project Manager:** Needs to efficiently track discussions, provide clarifications, and centralize communication about tasks without leaving their primary workflow in the MCP.
    
- **Team Member:** Needs to quickly get context on a task by reading comments and ask questions or provide updates directly on the relevant card.
    

**4\. Requirements Breakdown** | Phase | Sprint | User Story | Acceptance Criteria | Duration | | :--- | :--- | :--- | :--- | :--- | | Phase 1: MVP | Sprint 1 | As a user, I want to read all the comments on a Trello card. | 1. A `get_card_comments` tool is created and available in the MCP. <br> 2. The tool accepts a `card_id` as a required parameter. <br> 3. The tool returns a list of comments, each showing the author and text content. <br> 4. Comments are displayed in chronological order (oldest to newest). <br> 5. A clear error message is returned if the card ID is invalid or not found. | 2 weeks | | Phase 1: MVP | Sprint 2 | As a user, I want to add a new comment to a Trello card. | 1. An `add_comment_to_card` tool is created and available in the MCP. <br> 2. The tool accepts `card_id` and `comment_text` as required parameters. <br> 3. The comment is successfully posted to the correct Trello card. <br> 4. The user making the API call is correctly attributed as the comment's author in Trello. <br> 5. A confirmation of success or a clear error message is returned. | 2 weeks |

**5\. Timeline & Sprints**

- **Sprint 1: Read Comments (2 weeks)**
    
    - **Focus:** Backend development to integrate with the Trello API for fetching comments.
        
    - **Goal:** Deliver a functional `get_card_comments` tool.
        
- **Sprint 2: Add Comments (2 weeks)**
    
    - **Focus:** Backend development for the Trello API endpoint to post comments.
        
    - **Goal:** Deliver a functional `add_comment_to_card` tool.
        
- **Total Duration for Phase 1:** 4 weeks
    

**6\. Risks & Assumptions**

- **Risks:**
    
    - **Authentication & Permissions:** Ensuring that the API respects Trello's user permissions for reading and writing comments to private or restricted boards and cards.
        
    - **API Rate Limiting:** High-frequency use of these tools could potentially hit Trello's API rate limits. Usage should be monitored post-launch.
        
- **Assumptions:**
    
    - Users are already authenticated with Trello through the existing MCP setup.
        
    - The current infrastructure can support the addition of two new tool definitions and their corresponding API calls without significant overhead.
        

**7\. Success Metrics & Measurement**

- **Primary Metrics:**
    
    - **Tool Adoption Rate:** Measured by the number of unique users calling `get_card_comments` or `add_comment_to_card` per week.
        
    - **Engagement:** Measured by the total volume of comments added via the MCP.
        
- **Measurement Method:**
    
    - Internal logging of tool usage and API call success/failure rates.
        
    - User feedback collected through surveys and communication channels.


### PRD 2: Phase 2 - Advanced Comment Management

**1\. Title & Overview**

- **Project:** Trello MCP Integration - Advanced Comment Management
    
- **Summary:** Building on the MVP, this phase will introduce tools for users to edit and delete their own comments on Trello cards, providing more robust control over communication within the MCP.
    

**2\. Goals & Success Metrics**

- **Business Objectives:** Enhance user satisfaction and reduce errors by allowing for comment correction. Achieve feature parity with essential Trello collaboration functions.
    
- **User Success Metrics:**
    
    - Over 10% of users who add comments also use the edit or delete functionality within a month.
        
    - A measurable decrease in user-reported errors or requests for manual comment deletion.
        

**3\. User Personas**

- **Project Manager:** Needs to correct typos or update information in comments to avoid miscommunication with the team.
    
- **Team Member:** Wants to retract or rephrase a question or update after posting it to maintain clarity.
    

**4\. Requirements Breakdown** | Phase | Sprint | User Story | Acceptance Criteria | Duration | | :--- | :--- | :--- | :--- | :--- | | Phase 2: Advanced | Sprint 3 | As a user, I want to edit a comment I have made on a Trello card. | 1. An `edit_card_comment` tool is created. <br> 2. The tool accepts `card_id`, `comment_id`, and new `comment_text` as parameters. <br> 3. The user can only edit comments they have authored. <br> 4. The specified comment is successfully updated in Trello. <br> 5. A confirmation or clear error message (e.g., "permission denied") is returned. | 2 weeks | | Phase 2: Advanced | Sprint 4 | As a user, I want to delete a comment I have made on a Trello card. | 1. A `delete_card_comment` tool is created. <br> 2. The tool accepts `card_id` and `comment_id` as parameters. <br> 3. The user can only delete comments they have authored. <br> 4. The specified comment is successfully removed from the Trello card. <br> 5. A confirmation of success or a clear error message is returned. | 2 weeks |

**5\. Timeline & Sprints**

- **Sprint 3: Edit Comment (2 weeks)**
    
    - **Focus:** Backend development for the Trello API endpoint to update/edit existing comments.
        
    - **Goal:** Deliver a functional `edit_card_comment` tool with proper permission checks.
        
- **Sprint 4: Delete Comment (2 weeks)**
    
    - **Focus:** Backend development for the Trello API endpoint to delete comments.
        
    - **Goal:** Deliver a functional `delete_card_comment` tool with proper permission checks.
        
- **Total Duration for Phase 2:** 4 weeks
    

**6\. Risks & Assumptions**

- **Risks:**
    
    - **Comment Identification:** Users will need a reliable way to get the `comment_id` for the comment they wish to edit or delete. The `get_card_comments` tool from Phase 1 must be updated to return this ID.
        
    - **Permission Complexity:** Trello's API rules for comment editing/deletion by board admins vs. comment authors must be handled gracefully.
        
- **Assumptions:**
    
    - The `get_card_comments` tool from the MVP phase can be successfully modified in Sprint 3 to include the `comment_id` in its output.
        
    - The Trello API provides distinct and clear permissions for editing/deleting one's own comments versus others'.
        

**7\. Success Metrics & Measurement**

- **Primary Metrics:**
    
    - **Feature Usage:** Track the weekly call volume for `edit_card_comment` and `delete_card_comment`.
        
    - **User Journey Analysis:** Analyze logs to see if users are successfully using `get_card_comments` to find a `comment_id` and then passing it to the edit/delete tools.
        
- **Measurement Method:**
    
    - Dashboard monitoring of new tool usage statistics.
        
    - Funnel analysis to ensure the multi-step process (get ID -> edit/delete) is not a blocker for users.


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