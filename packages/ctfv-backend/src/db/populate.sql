-- Populating users table with random unique ids and corresponding dummyX usernames
INSERT INTO user (id, name, email, password, rollNo, instituteName, image, website, affiliation, country, isAdmin)
VALUES
('9c06fd6a-8cf4-4a09-9c89-c26032d01678', 'ADMIN', 'admin@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24001', 'IIT Delhi', 'dummy image link 1', 'dummy website link 1', 'some random 1st affilation', 'India', 1),
('cdb68275-ef25-414a-96e7-fc24009e7403', 'dummy2', 'dummyemail2@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24002', 'IIT Kanpur', 'dummy image link 2', 'dummy website link 2', 'some random 2nd affilation', 'USA', 0),
('2ae81051-6424-492c-a8f7-b90fdf701f95', 'dummy3', 'dummyemail3@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24003', 'IIT BHU', 'dummy image link 3', 'dummy website link 3', 'some random 3rd affilation', 'France', 0),
('37e7bf00-4075-4868-8594-d330d139b85f', 'dummy4', 'dummyemail4@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24004', 'IIT Bombay', 'dummy image link 4', 'dummy website link 4', 'some random 4th affilation', 'Italy', 0),
('75591a19-d000-4e8e-8f93-cf0b71dace5f', 'dummy5', 'dummyemail5@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24005', 'IIT KGP', 'dummy image link 5', 'dummy website link 5', 'some random 5th affilation', 'Spain', 0),
('80b737c8-8d57-46ee-80fe-b3eb0f61d6e5', 'dummy6', 'dummyemail6@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24006', 'IIT Guwahati', 'dummy image link 6', 'dummy website link 6', 'some random 6th affilation', 'Belgium', 0),
('6b133ad3-2f38-4887-a712-7ae8180b3337', 'dummy7', 'dummyemail7@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24007', 'IIT Roorkee', 'dummy image link 7', 'dummy website link 7', 'some random 7th affilation', 'Russia', 0),
('b3796bef-0bc0-419e-be0b-de252ca5f1b7', 'dummy8', 'dummyemail8@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24008', 'IIT Delhi', 'dummy image link 8', 'dummy website link 8', 'some random 8th affilation', 'Brazil', 0),
('ee2159c4-23b6-4132-9cc0-cd3de752978c', 'dummy9', 'dummyemail9@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24009', 'IIT Kanpur', 'dummy image link 9', 'dummy website link 9', 'some random 9th affilation', 'Pakistan', 0),
('a2b8185d-94f5-484c-939f-a28d63e1e760', 'dummy10', 'dummyemail10@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24010', 'IIT BHU', 'dummy image link 10', 'dummy website link 10', 'some random 10th affilation', 'Bangladesh', 0),
('be08d84f-8997-4cb0-942a-db0d12de115d', 'dummy11', 'dummyemail11@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24011', 'IIT Bombay', 'dummy image link 11', 'dummy website link 11', 'some random 11th affilation', 'India', 0),
('0f540772-2358-487f-8773-fba50339d1ad', 'dummy12', 'dummyemail12@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24012', 'IIT KGP', 'dummy image link 12', 'dummy website link 12', 'some random 12th affilation', 'USA', 0),
('31f9a3f6-e093-497b-b7b2-1222cdd5348e', 'dummy13', 'dummyemail13@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24013', 'IIT Guwahati', 'dummy image link 13', 'dummy website link 13', 'some random 13th affilation', 'France', 0),
('ce7b96a7-86ae-48c6-b679-33f0b4aa016f', 'dummy14', 'dummyemail14@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24014', 'IIT Roorkee', 'dummy image link 14', 'dummy website link 14', 'some random 14th affilation', 'Italy', 0),
('f05333e2-2e4c-42be-9ea2-7db3e3e7b602', 'dummy15', 'dummyemail15@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24015', 'IIT Delhi', 'dummy image link 15', 'dummy website link 15', 'some random 15th affilation', 'Spain', 0),
('8c0aaffa-f4b2-4eca-a5cf-847b5ef4c885', 'dummy16', 'dummyemail16@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24016', 'IIT Kanpur', 'dummy image link 16', 'dummy website link 16', 'some random 16th affilation', 'Belgium', 0),
('7c7e6c10-734c-4954-b2ab-64c2656dbe9e', 'dummy17', 'dummyemail17@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24017', 'IIT BHU', 'dummy image link 17', 'dummy website link 17', 'some random 17th affilation', 'Russia', 0),
('eabd88e4-924f-4eb4-a894-4580e3062623', 'dummy18', 'dummyemail18@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24018', 'IIT Bombay', 'dummy image link 18', 'dummy website link 18', 'some random 18th affilation', 'Brazil', 0),
('171aed86-67d0-4de0-8d3b-59913c369fc4', 'dummy19', 'dummyemail19@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24019', 'IIT KGP', 'dummy image link 19', 'dummy website link 19', 'some random 19th affilation', 'Pakistan', 0),
('589f168c-286f-4259-af34-21d8c57b574a', 'dummy20', 'dummyemail20@iitbhu.ac.in', '$2b$10$Plp.hOT99/0RkMh8ACgh4etoDF/fXk5gvp/AuHtIS5Dzx0qlt9zsm', '24020', 'IIT Guwahati', 'dummy image link 20', 'dummy website link 20', 'some random 20th affilation', 'Bangladesh', 0);


-- Populating challenges table for each category
INSERT INTO challenges (id, name, description, url, points, category, author, flag)
VALUES
('eb1dd43e-d2a3-4d4c-834d-332f34b1eb49', 'dummy challenge 1', 'dummy description which describes the challenge 1', 'randomUrl 1', 300, 'reversing', 'dummy author 1', 'dummy flag 1'),
('b378413e-ee49-4340-93ce-3d7b796fb84d', 'dummy challenge 2', 'dummy description which describes the challenge 2', 'randomUrl 2', 100, 'reversing', 'dummy author 2', 'dummy flag 2'),
('e3193b8a-d51f-4907-a2bc-92cdbe212c34', 'dummy challenge 3', 'dummy description which describes the challenge 3', 'randomUrl 3', 400, 'reversing', 'dummy author 3', 'dummy flag 3'),
('5f7d8c08-0fcc-4453-9fa1-cfb870868c71', 'dummy challenge 4', 'dummy description which describes the challenge 4', 'randomUrl 4', 200, 'reversing', 'dummy author 4', 'dummy flag 4'),
('cca8ea12-6c25-47c3-8ce2-004e97dd491c', 'dummy challenge 5', 'dummy description which describes the challenge 5', 'randomUrl 5', 500, 'reversing', 'dummy author 5', 'dummy flag 5'),

-- OSINT challenges
('cdf6b890-5cba-451a-88a8-98fd7350c42e', 'dummy challenge 6', 'dummy description which describes the challenge 6', 'randomUrl 6', 200, 'osint', 'dummy author 6', 'dummy flag 1'),
('d8a595fd-96a1-4317-a0c1-375f1eaeda84', 'dummy challenge 7', 'dummy description which describes the challenge 7', 'randomUrl 7', 400, 'osint', 'dummy author 7', 'dummy flag 2'),
('6a62dfc6-6946-4270-9744-65e30aa238c9', 'dummy challenge 8', 'dummy description which describes the challenge 8', 'randomUrl 8', 100, 'osint', 'dummy author 8', 'dummy flag 3'),
('373a6f02-2712-42f8-b891-2d4d44782788', 'dummy challenge 9', 'dummy description which describes the challenge 9', 'randomUrl 9', 500, 'osint', 'dummy author 9', 'dummy flag 4'),
('d8eed433-5483-413d-bbd3-6dc8e0edfe86', 'dummy challenge 10', 'dummy description which describes the challenge 10', 'randomUrl 10', 300, 'osint', 'dummy author 10', 'dummy flag 5'),

-- Pwn challenges
('d464e5eb-f4c3-4860-bd38-9191c51cec85', 'dummy challenge 11', 'dummy description which describes the challenge 11', 'randomUrl 11', 500, 'pwn', 'dummy author 11', 'dummy flag 1'),
('71c8131a-49b5-4a5c-8c17-d63289ff023d', 'dummy challenge 12', 'dummy description which describes the challenge 12', 'randomUrl 12', 300, 'pwn', 'dummy author 12', 'dummy flag 2'),
('29b56741-5f0a-417d-8512-2d1e3afecd06', 'dummy challenge 13', 'dummy description which describes the challenge 13', 'randomUrl 13', 100, 'pwn', 'dummy author 13', 'dummy flag 3'),
('421e4dd3-4a78-4ceb-94a3-078c65400fb7', 'dummy challenge 14', 'dummy description which describes the challenge 14', 'randomUrl 14', 400, 'pwn', 'dummy author 14', 'dummy flag 4'),
('d357834f-4bce-4d53-af12-f5fe788c4aba', 'dummy challenge 15', 'dummy description which describes the challenge 15', 'randomUrl 15', 200, 'pwn', 'dummy author 15', 'dummy flag 5'),

-- Web challenges
('a40cbfc0-7b86-4591-81ea-aa54394de587', 'dummy challenge 16', 'dummy description which describes the challenge 16', 'randomUrl 16', 100, 'web', 'dummy author 16', 'dummy flag 1'),
('fd0f8e1e-3bb1-42f1-b170-2b5a09e15437', 'dummy challenge 17', 'dummy description which describes the challenge 17', 'randomUrl 17', 300, 'web', 'dummy author 17', 'dummy flag 2'),
('b0688725-9a66-4592-8fcd-9cc02343de6e', 'dummy challenge 18', 'dummy description which describes the challenge 18', 'randomUrl 18', 500, 'web', 'dummy author 18', 'dummy flag 3'),
('95cf4e17-46f4-46fb-9290-69abb1696e72', 'dummy challenge 19', 'dummy description which describes the challenge 19', 'randomUrl 19', 200, 'web', 'dummy author 19', 'dummy flag 4'),
('13c536df-eb82-4766-b54e-d584c35b7b9e', 'dummy challenge 20', 'dummy description which describes the challenge 20', 'randomUrl 20', 400, 'web', 'dummy author 20', 'dummy flag 5'),

-- Forensics challenges
('4f3408a1-814c-4c54-b582-edd809b8f362', 'dummy challenge 21', 'dummy description which describes the challenge 21', 'randomUrl 21', 400, 'forensics', 'dummy author 21', 'dummy flag 1'),
('b0ac08a3-726b-4827-95bb-8cb5d3a7bd7d', 'dummy challenge 22', 'dummy description which describes the challenge 22', 'randomUrl 22', 200, 'forensics', 'dummy author 22', 'dummy flag 2'),
('0a67fa0b-6c52-4167-87eb-b6fe309a6758', 'dummy challenge 23', 'dummy description which describes the challenge 23', 'randomUrl 23', 500, 'forensics', 'dummy author 23', 'dummy flag 3'),
('c6609a0c-e36e-49be-a90f-a608eb817ba6', 'dummy challenge 24', 'dummy description which describes the challenge 24', 'randomUrl 24', 100, 'forensics', 'dummy author 24', 'dummy flag 4'),
('968d4c83-1e63-4aaf-8f45-80bd21395908', 'dummy challenge 25', 'dummy description which describes the challenge 25', 'randomUrl 25', 300, 'forensics', 'dummy author 25', 'dummy flag 5'),

-- Crypto challenges
('6bec44ac-1e7d-42a0-9ab0-c3cb2f40702f', 'dummy challenge 26', 'dummy description which describes the challenge 26', 'randomUrl 26', 200, 'crypto', 'dummy author 26', 'dummy flag 1'),
('49b239b6-95f4-4772-887d-8bf7741c854c', 'dummy challenge 27', 'dummy description which describes the challenge 27', 'randomUrl 27', 400, 'crypto', 'dummy author 27', 'dummy flag 2'),
('e72f75a5-7a4f-4116-bfcf-4f5bdff9ee70', 'dummy challenge 28', 'dummy description which describes the challenge 28', 'randomUrl 28', 100, 'crypto', 'dummy author 28', 'dummy flag 3'),
('ad686b9c-0275-4539-ac5e-9c6983552761', 'dummy challenge 29', 'dummy description which describes the challenge 29', 'randomUrl 29', 500, 'crypto', 'dummy author 29', 'dummy flag 4'),
('5d349612-21f1-447b-b0b6-e26b4e815014', 'dummy challenge 30', 'dummy description which describes the challenge 30', 'randomUrl 30', 300, 'crypto', 'dummy author 30', 'dummy flag 5'),

-- Stego challenges
('023de8eb-f5cf-4d61-9911-b24b03f9e0d7', 'dummy challenge 31', 'dummy description which describes the challenge 31', 'randomUrl 31', 300, 'stego', 'dummy author 31', 'dummy flag 1'),
('c67560e0-d231-4c5f-8fe7-7c18754333d7', 'dummy challenge 32', 'dummy description which describes the challenge 32', 'randomUrl 32', 100, 'stego', 'dummy author 32', 'dummy flag 2'),
('bdf1feb3-2336-4951-953f-c13d34003a98', 'dummy challenge 33', 'dummy description which describes the challenge 33', 'randomUrl 33', 500, 'stego', 'dummy author 33', 'dummy flag 3'),
('eab11b79-5fd5-4646-b72d-9cc667c23c2c', 'dummy challenge 34', 'dummy description which describes the challenge 34', 'randomUrl 34', 200, 'stego', 'dummy author 34', 'dummy flag 4'),
('996ac06c-5827-4029-befd-faded34553a5', 'dummy challenge 35', 'dummy description which describes the challenge 35', 'randomUrl 35', 400, 'stego', 'dummy author 35', 'dummy flag 5');