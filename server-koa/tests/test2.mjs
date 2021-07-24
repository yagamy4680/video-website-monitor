#!/usr/bin/env node
//
import got from "got";
import metascraper from 'metascraper';
import metascraper_author from 'metascraper-author';
import metascraper_date from 'metascraper-date';
import metascraper_description from 'metascraper-description';
import metascraper_image from 'metascraper-image';
import metascraper_logo from 'metascraper-logo';
import metascraper_clearbit from 'metascraper-clearbit';
import metascraper_publisher from 'metascraper-publisher';
import metascraper_title from 'metascraper-title';
import metascraper_url from 'metascraper-url';

const METASCRAPER = metascraper([
  metascraper_author(),
  metascraper_date(),
  metascraper_description(),
  metascraper_image(),
  metascraper_logo(),
  metascraper_clearbit(),
  metascraper_publisher(),
  metascraper_title(),
  metascraper_url()
]);

// const targetUrl = 'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance';
const targetUrl = 'https://www.youtube.com/watch?v=UocMW7BG0ls&list=RD0rp3pP2Xwhs&index=5'


;(async () => {
  const { body: html, url } = await got(targetUrl);
  const metadata = await META({ html, url });
  console.log(metadata);
})()

/*
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

const got = require('got');

const targetUrl = 'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance'

;(async () => {
  const { body: html, url } = await got(targetUrl)
  const metadata = await metascraper({ html, url })
  console.log(metadata)
})()
*/