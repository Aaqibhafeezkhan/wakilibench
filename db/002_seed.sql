-- WakiliBench V1 Seed Data
-- Run after schema migration

-- Topics
INSERT INTO topics (slug, title, description) VALUES
  ('contract-law', 'Contract Law', 'Formation, terms, breach, remedies. Practice issue spotting on Kenyan contract disputes.'),
  ('constitutional-law', 'Constitutional Law', 'Rights, devolution, separation of powers. Analyze constitutional questions under the 2010 framework.'),
  ('legal-writing-ai-safety', 'Legal Writing & AI Safety', 'Clarity, structure, citation integrity. Avoid hallucinated authorities and reason about AI limits.')
ON CONFLICT (slug) DO NOTHING;

-- Contract Law Scenarios
INSERT INTO scenarios (topic_id, title, fact_pattern, instructions, difficulty, expected_issues) VALUES
(
  (SELECT id FROM topics WHERE slug = 'contract-law'),
  'The Unfulfilled Supply Agreement',
  'Kamau entered into a written agreement with Wanjiku to supply 500 bags of cement at KES 800 per bag, delivery within 14 days. Kamau paid 50% upfront. After 21 days with no delivery, Kamau found the same cement from another supplier at KES 950 per bag. Wanjiku claims force majeure due to a transport strike that lasted 3 days.',
  'Identify the legal issues. Advise Kamau on his rights and remedies. Consider whether the force majeure claim is valid.',
  'intermediate',
  ARRAY['breach of contract', 'force majeure', 'mitigation of damages', 'specific performance vs damages']
),
(
  (SELECT id FROM topics WHERE slug = 'contract-law'),
  'The Verbal Lease Dispute',
  'Achieng verbally agreed to lease her shop in Kisumu to Otieno for 2 years at KES 30,000/month. After 6 months, Achieng demanded Otieno vacate within 7 days, claiming she never signed anything. Otieno has invested KES 200,000 in renovations with Achieng''s knowledge.',
  'Advise Otieno. Consider the enforceability of oral agreements, estoppel, and tenant protections under Kenyan law.',
  'intermediate',
  ARRAY['oral contracts', 'statute of frauds', 'proprietary estoppel', 'tenant rights', 'part performance']
),
(
  (SELECT id FROM topics WHERE slug = 'contract-law'),
  'The Frustrated Service Contract',
  'MobiTech Ltd contracted CloudHost Kenya to provide server hosting for 12 months. After 3 months, a new government regulation banned foreign-owned data centers, and CloudHost (foreign-owned) had to shut down. MobiTech lost 2 weeks of data and demands full refund plus damages.',
  'Analyze whether the contract is frustrated. Discuss allocation of risk, data loss liability, and available remedies.',
  'advanced',
  ARRAY['frustration of contract', 'force majeure vs frustration', 'allocation of risk', 'data liability', 'restitution']
),
(
  (SELECT id FROM topics WHERE slug = 'contract-law'),
  'The Minor''s Online Purchase',
  'Brian, aged 16, used his mother''s M-Pesa to purchase a laptop online for KES 85,000 from TechMall Ltd. The laptop arrived defective. TechMall refuses a refund, arguing Brian lacked capacity to contract. Brian''s mother was unaware of the purchase.',
  'Advise on capacity issues, enforceability, and whether Brian or his mother can claim a remedy.',
  'beginner',
  ARRAY['capacity of minors', 'necessaries', 'voidable contracts', 'consumer protection', 'agency']
),
(
  (SELECT id FROM topics WHERE slug = 'contract-law'),
  'The Non-Compete Clause',
  'Njeri signed an employment contract with LawFirm Associates containing a 5-year non-compete clause covering all of East Africa. After resigning, she opened her own practice in Nakuru. LawFirm seeks an injunction.',
  'Evaluate the enforceability of the non-compete clause. Consider reasonableness, restraint of trade, and Kenyan constitutional rights.',
  'advanced',
  ARRAY['restraint of trade', 'reasonableness test', 'constitutional right to work', 'injunctive relief', 'severability']
);

-- Constitutional Law Scenarios
INSERT INTO scenarios (topic_id, title, fact_pattern, instructions, difficulty, expected_issues) VALUES
(
  (SELECT id FROM topics WHERE slug = 'constitutional-law'),
  'The County Revenue Dispute',
  'Makueni County passed a Finance Act imposing a 2% levy on all agricultural exports from the county. The national government argues this violates the division of revenue provisions. Local farmers support the levy as it funds irrigation.',
  'Analyze the constitutional validity of the county levy. Consider the division of powers, revenue allocation, and public participation requirements.',
  'intermediate',
  ARRAY['devolution', 'county vs national powers', 'revenue allocation', 'public participation', 'Article 209']
),
(
  (SELECT id FROM topics WHERE slug = 'constitutional-law'),
  'The Social Media Shutdown',
  'During election week, the Communications Authority ordered ISPs to throttle social media platforms for 72 hours, citing national security. A blogger whose income depends on social media challenges the order.',
  'Advise on the constitutional issues. Consider freedom of expression, limitation of rights, and proportionality.',
  'intermediate',
  ARRAY['freedom of expression', 'Article 33', 'limitation clause Article 24', 'proportionality', 'right to information']
),
(
  (SELECT id FROM topics WHERE slug = 'constitutional-law'),
  'The Eviction Without Notice',
  'County enforcement officers demolished 50 structures in an informal settlement with 4 hours notice. Residents, including a pregnant woman who was hospitalized, had lived there for 12 years. The county claims the land is public and earmarked for a road.',
  'Identify the constitutional violations. Discuss the right to housing, fair administrative action, and proportionality.',
  'beginner',
  ARRAY['right to housing', 'fair administrative action', 'Article 47', 'proportionality', 'vulnerable groups', 'legitimate expectations']
),
(
  (SELECT id FROM topics WHERE slug = 'constitutional-law'),
  'The Gender Quota Challenge',
  'A political party nominated its candidates for county assembly. Of 30 nominees, only 4 are women. A women''s rights organization challenges the nomination list.',
  'Analyze the two-thirds gender rule. Consider its enforcement, the role of IEBC, and available remedies.',
  'intermediate',
  ARRAY['two-thirds gender rule', 'Article 27', 'Article 81', 'affirmative action', 'IEBC mandate']
),
(
  (SELECT id FROM topics WHERE slug = 'constitutional-law'),
  'The Presidential Directive',
  'The President issued a directive ordering all public universities to merge departments with fewer than 100 students. University senates object, claiming violation of academic freedom and institutional autonomy.',
  'Assess the constitutional validity of the directive. Consider separation of powers, academic freedom, and the right to education.',
  'advanced',
  ARRAY['separation of powers', 'executive authority limits', 'academic freedom', 'right to education', 'institutional autonomy']
);

-- Legal Writing & AI Safety Scenarios
INSERT INTO scenarios (topic_id, title, fact_pattern, instructions, difficulty, expected_issues) VALUES
(
  (SELECT id FROM topics WHERE slug = 'legal-writing-ai-safety'),
  'The Hallucinated Case Citation',
  'A junior lawyer used an AI tool to draft submissions and cited "Mwangi v Republic [2019] eKLR" for the principle that confessions obtained without caution are inadmissible. The case does not exist. The opposing counsel has flagged it.',
  'Draft a note to the court addressing the citation error. Discuss obligations of counsel regarding citation accuracy and the risks of AI-assisted legal research.',
  'beginner',
  ARRAY['duty of candor', 'citation verification', 'AI hallucination risk', 'professional responsibility', 'corrective action']
),
(
  (SELECT id FROM topics WHERE slug = 'legal-writing-ai-safety'),
  'The Ambiguous Demand Letter',
  'Review this demand letter excerpt: "Our client is aggrieved by your actions which have caused untold suffering and immeasurable damages. We demand you forthwith remedy the situation failing which we shall institute proceedings without further reference." The recipient asks: what exactly must they do, by when, and what amount is claimed?',
  'Rewrite the demand letter to be specific, clear, and actionable. Identify what makes the original ineffective.',
  'beginner',
  ARRAY['specificity', 'clarity of demand', 'measurable claims', 'deadlines', 'professional tone']
),
(
  (SELECT id FROM topics WHERE slug = 'legal-writing-ai-safety'),
  'The AI-Generated Contract Review',
  'A startup founder used ChatGPT to generate a partnership agreement. The agreement contains a clause stating: "All disputes shall be resolved by arbitration under the UNCITRAL rules in Singapore." The partners are two Kenyans operating solely in Nairobi.',
  'Identify problems with the AI-generated clause. Suggest appropriate dispute resolution provisions and explain jurisdiction considerations.',
  'intermediate',
  ARRAY['jurisdiction appropriateness', 'arbitration clause drafting', 'AI-generated legal text risks', 'local vs international arbitration', 'cost proportionality']
),
(
  (SELECT id FROM topics WHERE slug = 'legal-writing-ai-safety'),
  'The Biased Training Data Problem',
  'A legal-tech company built a bail prediction tool trained on 10 years of Kenyan court data. Analysis shows the tool recommends denial of bail 40% more often for defendants from certain counties. The company wants to deploy it as a "judicial assistant."',
  'Analyze the ethical and legal risks. Consider bias, constitutional rights, and appropriate safeguards for AI in judicial processes.',
  'advanced',
  ARRAY['algorithmic bias', 'fair trial rights', 'Article 50', 'non-discrimination', 'AI transparency', 'judicial independence']
),
(
  (SELECT id FROM topics WHERE slug = 'legal-writing-ai-safety'),
  'The Confidentiality Breach via AI',
  'An advocate uploaded a client''s confidential settlement agreement to an AI summarization tool to prepare for a related case. The AI provider''s terms state that inputs may be used for model training. Opposing counsel now has access to similar language in their AI tool.',
  'Advise on the professional conduct issues. Consider client confidentiality, informed consent, and safe AI usage practices for lawyers.',
  'intermediate',
  ARRAY['client confidentiality', 'professional conduct', 'informed consent', 'AI data privacy', 'duty of care', 'technology competence']
);
