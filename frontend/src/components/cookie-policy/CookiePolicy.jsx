import React from 'react'
import './CookiePolicy.css';
import { FaBook, FaList, FaSlidersH, FaTools, FaUser } from 'react-icons/fa'
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Fa42Group } from 'react-icons/fa6';

const CookiePolicy = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='cookie-container'>
            <div className='section'>
                <h1>Introduction</h1>
                <h6>
                    This document informs Users about the technologies that help this Application to achieve the purposes described below. Such technologies allow the Owner to access and store information (for example by using a Cookie) or use resources (for example by running a script) on a User’s device as they interact with this Application.

                    For simplicity, all such technologies are defined as "Trackers" within this document – unless there is a reason to differentiate.
                    For example, while Cookies can be used on both web and mobile browsers, it would be inaccurate to talk about Cookies in the context of mobile apps as they are a browser-based Tracker. For this reason, within this document, the term Cookies is only used where it is specifically meant to indicate that particular type of Tracker.

                    Some of the purposes for which Trackers are used may also require the User's consent. Whenever consent is given, it can be freely withdrawn at any time following the instructions provided in this document.

                    This Application only uses Trackers managed directly by the Owner (so-called “first-party” Trackers).
                    The validity and expiration periods of first-party Cookies and other similar Trackers may vary depending on the lifetime set by the Owner. Some of them expire upon termination of the User’s browsing session.
                </h6>
            </div>
            
            <div className='section'>
                <h1><FaUser className='icn'/> Owner and Data Controller</h1>
                <h3>NoSaintz Studio - Via Galileo Galilei, 10, Civesio / S. Giuliano Milanese, 20098, (MI)

                    Owner contact email: nicolo.casertano@gmail.com
                </h3>     
            </div>

            <div className='section'>
                <h1><FaTools className='icn'/>How this Application uses Trackers</h1>
                <h3>Necessary</h3>
                <h6>This Application uses so-called “technical” Cookies and other similar Trackers to carry out activities that are strictly necessary for the operation or delivery of the Service.</h6>     
            </div>

            <div className='section'>
                <h1><FaSlidersH className='icn'/> How to manage preferencesand <br />provide or
                        withdraw consent <br />on this Application</h1>
                <h6>Whenever the use of Trackers is based on consent, users can provide or withdraw such consent by setting or updating their preferences via the relevant privacy choices panel available on this Application.</h6>
                <h3>How to control or delete Cookies and similar technologies via your device settings</h3>
                <h6>Users may use their own browser settings to:
                    <br /><br />
                    See what Cookies or other similar technologies have been set on the device;
                    Block Cookies or similar technologies;
                    Clear Cookies or similar technologies from the browser.
                    The browser settings, however, do not allow granular control of consent by category.
                    <br /><br />
                    Users can, for example, find information about how to manage Cookies in the most commonly used browsers at the following addresses:  <br /><br />

                    <a href="https://support.google.com/chrome/answer/95647?hl=en&p=cpn_cookies" target='_blank'>Google Chrome</a><br /><br />
                    <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target='_blank'>Mozilla Firefox</a><br /><br />
                    <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target='_blank'>Apple Safari</a><br /><br />
                    <a href="https://support.microsoft.com/it-it/windows/gestire-i-cookie-in-microsoft-edge-visualizzare-consentire-bloccare-eliminare-e-usare-168dab11-0753-043d-7c16-ede5947fc64d" target='_blank'>Microsoft Internet Explorer</a><br /><br />
                    <a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target='_blank'>Microsoft Edge</a><br /><br />
                    <a href="https://support.brave.app/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-browsing" target='_blank'>Brave</a><br /><br />
                    <a href="https://help.opera.com/en/latest/web-preferences/#cookies" target='_blank'>Opera</a><br /><br />

                    Users may also manage certain categories of Trackers used on mobile apps by opting out through relevant device settings such as the device advertising settings for mobile devices, or tracking settings in general (Users may open the device settings and look for the relevant setting).
                </h6>
                <h3>Consequences of denying consent</h3>
                <h6>Users are free to decide whether or not to grant consent. However, please note that Trackers help this Application to provide a better experience and advanced functionalities to Users (in line with the purposes outlined in this document). Therefore, in the absence of the User's consent, the Owner may be unable to provide related features.</h6>
            </div>

            <div className='section'>
                <h1><FaBook className='icn'/> Definitions and legal references</h1>
                <h3>Personal Data (or Data)</h3>
                <h6>Any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.</h6>
                <h3>Usage Data</h3>
                <h6>Information collected automatically through this Application (or third-party services employed in this Application), which can include: the IP addresses or domain names of the computers utilised by the Users who use this Application, the URI addresses (Uniform Resource Identifier), 
                    the time of the request, the method utilised to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating 
                    system utilised by the User, the various time details per visit (e.g., the time spent on each page within the Application)
                    and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment.
                </h6>
                <h3>User</h3>
                <h6>
                    The individual using this Application who, unless otherwise specified, coincides with the Data Subject.
                </h6>
                <h3>Data Subject</h3>
                <h6>The natural person to whom the Personal Data refers.</h6>
                <h3>Data Processor (or Processor)</h3>
                <h6>The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Controller, as described in this privacy policy.</h6>
                <h3>Data Controller (or Owner)</h3>
                <h6>The natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data, including the security measures concerning the operation and use of this Application. 
                    The Data Controller, unless otherwise specified, is the Owner of this Application.
                </h6>
                <h3>This Application</h3>
                <h6>The means by which the Personal Data of the User is collected and processed.</h6>
                <h3>Service</h3>
                <h6>The service provided by this Application as described in the relative terms (if available) and on this site/application.</h6>
                <h3>European Union (or EU)</h3>
                <h6>Unless otherwise specified, all references made within this document to the European Union include all current member states to the European Union and the European Economic Area.</h6>

                <h4>Legal information</h4>
                <h6>This privacy policy relates solely to this Application, if not stated otherwise within this document.</h6>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default CookiePolicy