const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

// PAGES
router.get("/", pageController.getHome);
router.get("/about", pageController.getAbout);
router.get("/blog", pageController.getBlog);
router.get("/explore", pageController.getExplore);
router.get("/offers", pageController.getOffers);
router.get("/codeofconduct", pageController.getCodeOfConduct);
router.get("/partnerwithus", pageController.getPartnerWithUs);

// CONTACT
router.get("/contact", pageController.getContact);
router.post("/contact", pageController.postContact);

// TERMS & CONDITIONS
router.get("/terms&conditions", pageController.getTermsAnd);
router.get("/terms-and-conditions", pageController.getTermsClean);

// PRIVACY POLICY
router.get("/privacypolicy", pageController.getPrivacy);

// SECURITY
router.get("/security", pageController.getSecurity);

// REPORT
router.get("/report", pageController.getReport);
router.post("/report", pageController.postReport);

// SEARCH
router.get("/search", pageController.getSearch);

module.exports = router;
