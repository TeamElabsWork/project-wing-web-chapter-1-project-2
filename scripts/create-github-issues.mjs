import { execSync } from 'child_process';
import path from 'path';

const REPO = 'TeamElabsWork/project-wing-web-chapter-1-project-2';
const ghPath = '"C:\\Program Files\\GitHub CLI\\gh.exe"';

const issues = [
  {
    number: 1,
    title: '[Auth] User Registration Form & Client-Side Validation',
    assignee: 'aman-0905',
    labels: ['frontend', 'auth', 'p0'],
    file: 'scripts/issues/issue-1.md'
  },
  {
    number: 2,
    title: '[Auth] User Login Page, Session Persistence & Route Protection Guard',
    assignee: 'pandatech717-code',
    labels: ['frontend', 'auth', 'backend', 'p0'],
    file: 'scripts/issues/issue-2.md'
  },
  {
    number: 3,
    title: '[Gallery] Responsive Photo Grid Layout & Hero Header Section',
    assignee: 'ananya-umang',
    labels: ['frontend', 'ui', 'css', 'p0'],
    file: 'scripts/issues/issue-3.md'
  },
  {
    number: 4,
    title: '[Gallery] Pagination & Client-Side Load More Fetching Logic',
    assignee: 'SatyamCodes7',
    labels: ['frontend', 'javascript', 'api', 'p0'],
    file: 'scripts/issues/issue-4.md'
  },
  {
    number: 5,
    title: '[Photo View] Interactive Photo Detail Page (/photos/[id]) & High-Res Viewer',
    assignee: '404SAMfound',
    labels: ['frontend', 'ui', 'p1'],
    file: 'scripts/issues/issue-5.md'
  },
  {
    number: 6,
    title: '[Photo View] Image Lightbox Fullscreen Zoom & Modal Overlay',
    assignee: 'Tushar-162',
    labels: ['frontend', 'ui', 'css', 'p1'],
    file: 'scripts/issues/issue-6.md'
  },
  {
    number: 7,
    title: '[Upload] Drag-and-Drop Image Upload Form & Live Preview',
    assignee: 'satyaprakashs89420-blip',
    labels: ['frontend', 'ui', 'javascript', 'p0'],
    file: 'scripts/issues/issue-7.md'
  },
  {
    number: 8,
    title: '[Upload] Server-Side Upload Route Handler & Cloudinary Storage Pipeline',
    assignee: 'aman-0905',
    labels: ['backend', 'storage', 'api', 'p0'],
    file: 'scripts/issues/issue-8.md'
  },
  {
    number: 9,
    title: '[Profile] Photographer Showcase Portfolio Page (/users/[id])',
    assignee: 'manishpandey01-max',
    labels: ['frontend', 'ui', 'css', 'p1'],
    file: 'scripts/issues/issue-9.md'
  },
  {
    number: 10,
    title: '[Profile] Edit Profile Settings Modal & Bio/Avatar API',
    assignee: 'pandatech717-code',
    labels: ['frontend', 'backend', 'p1'],
    file: 'scripts/issues/issue-10.md'
  },
  {
    number: 11,
    title: '[Management] Photo Owner Actions: Edit Title/Description & Delete with Confirmation',
    assignee: 'SatyamCodes7',
    labels: ['frontend', 'backend', 'p1'],
    file: 'scripts/issues/issue-11.md'
  },
  {
    number: 12,
    title: '[Moderation & Safety] Admin Content Removal & Community Guidelines Modal',
    assignee: '404SAMfound',
    labels: ['frontend', 'backend', 'security', 'p1'],
    file: 'scripts/issues/issue-12.md'
  }
];

for (const issue of issues) {
  console.log(`Creating Issue #${issue.number}: ${issue.title} (Assignee: @${issue.assignee})...`);
  const filePath = path.resolve(process.cwd(), issue.file);
  try {
    const cmd = `${ghPath} issue create --repo ${REPO} --title "${issue.title.replace(/"/g, '\\"')}" --body-file "${filePath}" --assignee "${issue.assignee}"`;
    const out = execSync(cmd, { encoding: 'utf-8' });
    const issueUrl = out.trim();
    console.log(`  ✓ Created: ${issueUrl}`);
  } catch (err) {
    console.log(`  ! Notice on direct assignment: ${err.message}`);
    // If assignee fails due to pending invitation, create without assignee then add comment
    try {
      const fallbackCmd = `${ghPath} issue create --repo ${REPO} --title "${issue.title.replace(/"/g, '\\"')}" --body-file "${filePath}"`;
      const fallbackOut = execSync(fallbackCmd, { encoding: 'utf-8' });
      const issueUrl = fallbackOut.trim();
      console.log(`  ✓ Created without assignee flag: ${issueUrl}`);

      // Try assigning via API or add comment tagging user
      const commentCmd = `${ghPath} issue comment ${issueUrl} --body "Assigned to @${issue.assignee}. Note: Please accept your collaborator invitation to the repository to display the assignee badge."`;
      execSync(commentCmd, { encoding: 'utf-8' });
      console.log(`  ✓ Tagged @${issue.assignee} in issue comment`);
    } catch (fallbackErr) {
      console.error(`  ✗ Failed to create issue:`, fallbackErr.message);
    }
  }
}
