const express = require('express');
const Page = require('../models/Page');
const Url = require('../models/Url');

const router = express.Router();

router.post('/create', async (req, res) => {
	try {
		const pages = await Page.find();
		const pageId = pages.length + 1;

		const { pageData, components } = req.body;

		if(!components || components.length === 0) {
			res.send("At least one component is required");
		} else {
			const page = await Page.create({
				pageId,
				pageData: pageData ? JSON.stringify(pageData) : null,
				components: components ? JSON.stringify(components) : [],
	
			})
			res.send(page);
		}
 
	} catch(err) {
		console.log("Error ", err);
	}
	res.send("Error in creating a page");
	
})

router.get('/getPage', async (req, res) => {
	const { id } = req.query;
	if(id) {
		const pageId = Number(id);
		const page = await Page.findOne({ pageId });
		if(page) {
			res.send(page);
		} else {
			res.send("Page not found");
		}
	}
	res.send('Error fetching page');
})

router.post('/createUrl', async (req, res) => {
	try {
		const { pageId, url } = req.body;

		if(pageId && url) {
			const urlResource = await Url.findOne({ url });
			if(urlResource) {
				res.send("Url already exists");
			} else {
				const page = await Page.findOne({ pageId });
				if(page) {
					const urlResponse = await Url.create({ pageId, url });
					res.send(urlResponse);
				} else {
					res.send("pageId not found");
				}
			}
		} else {
			res.send("PageId and url is mandatory");
		}
		
	} catch(err) {
		console.log("Error ", err);
	}
	res.send("Error in creating a url");
})

module.exports = router;