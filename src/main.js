/*
 * Gabe Dunn 2019
 * Generates a contract to use for development projects.
 * Inspired by and adopted from the contact at this link:
 * https://www.docracy.com/sign/usedoc?signing=true&docId=0kpa5hfcobb&versionNum=2
 */

import json2md from 'json2md'
import { join } from 'path'
import { writeFileSync } from 'fs'

import { me, client, phases, projectType, capitalize } from './constants'

// Generate some constants.
const exportDirectory = join(__dirname, '..')
const exportFile = join(exportDirectory, 'Contact.md')

// The title variables.
const title = `${capitalize(projectType)} Development Contract.`
const subtitle = `A contract between me: ${me.name} ("I", "me", "developer", "${me.nickname}", or "${me.company}" in ` +
  `this document) and you: ${client.name} ("you", "client", "${client.nickname}", "${client.company}", or ` +
  `"${client.contact}" in this document).`

// The intro paragraph.
const intro = 'I will always do my best to fulfil your needs and meet your goals, but sometimes it is best to have a ' +
  'few simple things written down so that we both know what is what, who should do what and what happens if things ' +
  'go wrong. In this contract you won\'t find complicated legal terms or large passages of unreadable text. I have ' +
  'no desire to trick you into signing something that you might later regret. I want what\'s best for the safety ' +
  'of both parties, now and in the future.'

// The project summary paragraph.
const projectSummary = `You, the client (${client.name}), are hiring me, ${me.name}, to develop a ${projectType} ` +
  'application for the estimated total price of outlined in our previous correspondence. The agreed payment plan is ' +
  'at the end of the document.'

// The agreements variables.
const clientAgreements = [
  'That you have the power to enter into this contract on behalf of yourself, your company, or your organization.',
  'To provide me with everything that I need to complete the project including (but not limited to) text, copy, ' +
  'account credentials, images, and other information as and when I need it, in the format that I ask for.',
  'To review my work, provide feedback, and sign-off within agreed upon timescales.',
  'To be bound by any dates that we set together for deadlines.',
  'To stick to the payment schedule described at the end of this contract.'
]
const developerAgreements = [
  'That I have the experience and ability to perform the services that we have agreed upon.',
  'To carry out this service in a professional and timely manner.',
  'To respect the confidentiality of any information that you give me.',
  'To endeavor to meet all of the deadlines set, but I can\'t be held responsible for a missed launch date or ' +
  'deadline if you have been late in supplying materials or have not approved or signed off on my work on time at any' +
  'stage.'
]

// Details variables.
const detailsParagraphs = [
  'I can and will provide suggestions for designs, templates, look and feel, layout, and functionality of the ' +
  `${projectType} application. I will provide some design support as necessary to complete the design of the app, ` +
  'fully develop the application, and implement a custom backend as needed, and potentially extend the backend to ' +
  'allow for future maintenance of the site on your own.',
  '*Testing and Cross-Browser Compatibility*',
  'I will not be testing the application in old or abandoned environments, including but not limited to some ' +
  'examples such as Microsoft Internet Explorer, previous versions of browsers such as Apple\'s Safari, Mozilla\'s ' +
  'Firefox, Google\'s Chrome (or Chromium), or Opera unless otherwise specified. If you need to show the same or' +
  'similar visual design to users using these older browsers, we will have to re-negotiate an increased rate, as ' +
  'developing for these older browser is costly and time-consuming.',
  '*Content Input*',
  'I am not responsible for writing or inputting any content. That includes but is not limited to: products, page' +
  'content, categories, attributes, and product tags. I\'ll be happy to help, though, and in addition to the initial' +
  'estimate I will charge you at an hourly rate for this content input. Even so, I expect most of the copy to be ' +
  'provided by you, as you know the nature of your business and message better than I do.',
  '*Workflow and Design*',
  'If you have already engaged the services of a graphic designer who has produced mockups of the design of your' +
  'website, I will work from these and endeavor to produce a website resembling them as closely as possible. Note ' +
  'that it might not be possible to produce pixel-perfect interpretations of them across all browsers and under all ' +
  'circumstances due to technical limitations beyond my control. I will need your mockups in both PSD PNG, and ' +
  'whichever other source files you were provided with all of the original layers intact so I can access the required' +
  'assets from them directly.',
  '*Changes and Revisions*',
  'Changes and revisions can be submitted by the client upon review of each milestone or phase (referred to solely ' +
  'as "phase"), and finally upon review of the last phase which will include a project-wide review. If further work ' +
  `is needed after the completion of the final phase, work can be acquired at an additional cost of $${me.hourly}` +
  `${me.currency}/hour, subject to change based upon availability.`,
  'As each phase is being worked on, changes and revisions should be communicated quickly and directly so that fixes' +
  'happening on an ongoing basis. When development has been completed for a phase, feedback from the client cannot ' +
  `take more than ${me.feedbackDays} business days or the phase is considered to be satisfactorily complete.`
]

// Cancelling variables.
const clientCancellation = [
  'I will retain your down payment.',
  'I will retain the payments for each of the completed phases.',
  'If I am working on a phase that has not yet been completed, that phase will be considered completed and as such I ' +
  'will receive full payment for it as a "kill fee".',
  'The "kill fee" will be considered the final payment for the project.'
]
const developerCancellation = [
  'I will retain your down payment.',
  'I will retain the payments for each of the completed phases.',
  'If I am working on a phase that has not yet been completed, that phase will be disregarded, and as such you will ' +
  'not be required to pay for any work done on that phase.',
  'The payment for the last completed phase will be considered the final payment for the project.'
]

// Legal variables.
const legalParagraphs = [
  'I will take the utmost care and attention to ensure that my provided product is error-free ' +
  `and adequately future-proofed, but due to the rapidly-evolving nature of the ${projectType} ecosystem and ` +
  'standards it is not possible to guarantee that the code will function as intended indefinitely and as such I ' +
  'can\'t be liable to you or any third party for damages, including but not limited to lost profits, lost savings ' +
  'or any other incidental, consequential , or special damages arising out of the operation of, inability to ' +
  `operate, or loss of function of this ${projectType} application and any other ${projectType} application, even if ` +
  'I have been made aware of the possibilities of such damages.',
  '*Severability.* Whenever possible, each provision of this Agreement shall be interpreted in such manner as to be ' +
  'effective and valid under applicable law, but if any provision of this Agreement is held invalid or ' +
  'unenforceable, the remainder of this Agreement shall nevertheless remain in full force and effect and the invalid ' +
  'or unenforceable provision shall be replaced by a valid or enforceable provision.',
  '*Third Party Materials.* All third party materials are the exclusive property of their respective owners. I shall ' +
  'inform you of all third party materials that may be/are required to perform the services or otherwise integrated ' +
  'into the final project. Under such circumstances, I shall inform you of any need to license.',
  `*Exclusivity.* ${client.name} expressly acknowledge that although they are free to engage others to perform ` +
  `services of the same or similar nature to those provided by ${me.name}, I must be notified of such engagements, ` +
  'and in the occurrence of an engagement of this nature I retain the right to terminate my involvement in the ' +
  'project and consider it equivalent to - under the terms of this contract - you cancelling the agreement, and as ' +
  'such I will retain the right to receive the same "kill fee" referred to in the previous cancellation section. ' +
  `Additionally, ${me.name} shall be entitled to offer and provide my services to others, solicit other clients, and ` +
  `otherwise advertise the services offered by ${me.name}.`,
  '*Governing Law.* The formation, construction, performance and enforcement of this Agreement shall be in accordance' +
  ' with the laws of Canada without regard to its conflict of law provisions or the conflict of law provisions of any' +
  ' other jurisdiction.',
  'Just like a parking ticket, you cannot transfer this contract to anyone else without my permission. This contract ' +
  'stays in place and need not be renewed.'
]

// Copyright variables.
const copyrightParagraphs = [
  'You guarantee to me that any elements of text, graphics, photos, designs, trademarks, or ' +
  `other artwork that you provide me for inclusion in the ${projectType} application are either owned by your good ` +
  'self, or that you have permission to use them.',
  `By default, all copyrights and intellectual properties are solely owned by ${me.name}, and will only be ` +
  `transferred to ${client.name} upon the final payment for the project.`,
  'In the event of the cancellation of this Agreement, the payment for the last complete phase will be considered the ' +
  `final payment, and ${client.name} will receive the copyrights and intellectual property for all of the completed ` +
  'phases.',
  'When I receive the final payment, all copyright and intellectual property is automatically assigned as follows:'
]
const copyrightAssignments = [
  'You own the graphics and other visual elements that I create for you for this project. I will give you a copy of ' +
  'all related files and you should store them carefully as I will not be required to keep them nor provide any ' +
  'native source files that I used in making them. If I decide to provide any of these native source files, I will ' +
  'be under no future requirement to provide or replace these files at any time.',
  'You also own all text content, photographs, and other data that you provided, unless they are owned by someone else.',
  'I reserve the right to retain a copy of all files used in or relating to the creation of the project. This does ' +
  'not mean that I own the copyright to them.',
  'I reserve the right to display and link to your completed project as part of my portfolio and write about the ' +
  'project on websites, in magazine articles, in books, or any other platform, unless otherwise agreed upon. In the ' +
  `case of this happening, I will notify you, and any additional publicity or traffic that your ${projectType} ` +
  'application gains is of course free of charge.'
]

// Phases variables.
const phasesMap = phases.slice(1).map(phase => {
  return [
    { h3: `Phase ${phase.phase}` },
    { blockquote: `Cost: $${phase.cost} ${me.currency}` },
    {
      ul: phase.elements.concat([
        'Feedback on phase.',
        'Testing of phase and integration with previous phases.',
        'Amendments.',
        'Testing of amendments.'
      ])
    }
  ]
}).concat([
  [
    { h3: 'Final Review & Amendments' },
    { blockquote: 'Cost: Subject to change based on changes & amendments.' },
    {
      ul: [
        'Feedback on entire project.',
        'Testing of entire project.',
        'Amendments.',
        'Final review and feedback.',
        'Sign-off.'
      ]
    }
  ]
])

// Payments variables.
const allCosts = phases.map(phase => phase.cost)
const totalCost = allCosts.reduce((prev, curr) => prev + curr, 0)
const paymentsParagraphs = [
  'I am sure you understand how important it is for a small business such as myself that you ' +
  'pay the invoices that I send you promptly. As I\'m also sure you want to remain on good terms, you agree to stick ' +
  'tight to the following payment schedule, which will be as follows, but may be revised based on further ' +
  'conversations between us.',
  `The total cost of the project is \`$${totalCost} ${me.currency}\`.`,
  `I will invoice for an initial down payment of $${allCosts[0]} ${me.currency} once this agreement has been signed. ` +
  'I will start work after receiving this payment.',
  `I will invoice for the remaining balance(s) (${allCosts.slice(1).map(cost => `$${cost} ${me.currency}`).join(', ')})` +
  'after each of the respective phases are completed as described. These are due not more than 7 days after the phase ' +
  'has been considered complete and the invoice has been sent.',
  `Interest accrued if payment is more than 14 days late is ${me.interest}% of the outstanding amount to be added ` +
  'every 7 days, starting from the 15th day after the invoice has been sent.'
]

// Signature variables.
const clientSignature = `Client (${client.contact} for ${client.name}): \t\t_____________________`
const developerSignature = `Developer (${me.name} for ${me.company}): \t_____________________`
const witnessSignature = `Witness (_____________________): \t\t\t_____________________`

const contractMarkdown = json2md([
  { h1: title },
  { blockquote: subtitle },
  { h2: 'Introduction' },
  { p: intro },
  { h2: 'Project Summary' },
  { p: projectSummary },
  { h2: 'Agreements of Both Parties' },
  { p: 'As my client, you agree:' },
  { ul: clientAgreements },
  { p: 'As the developer, I agree:' },
  { ul: developerAgreements },
  { h2: 'Details of the Work' },
  { p: detailsParagraphs },
  { h2: 'Cancelling this Contract' },
  { p: 'If you wish to cancel this Agreement:' },
  { ul: clientCancellation },
  { p: 'If I wish to cancel this Agreement:' },
  { ul: developerCancellation },
  { h2: 'Legal Stuff' },
  { p: legalParagraphs },
  { h2: 'Copyrights and Intellectual Properties' },
  { p: copyrightParagraphs },
  { ul: copyrightAssignments },
  { h2: 'Project Phases' },
  phasesMap,
  { h2: 'Payments' },
  { p: paymentsParagraphs },
  { h2: 'Signatures' },
  { p: clientSignature },
  { p: developerSignature },
  { p: witnessSignature },
  { p: 'Everyone should sign above and keep a copy for their own records.' }
])

console.log(contractMarkdown)

writeFileSync(exportFile, contractMarkdown, 'utf8')
