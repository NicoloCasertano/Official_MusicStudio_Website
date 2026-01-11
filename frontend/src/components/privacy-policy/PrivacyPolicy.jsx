import React from 'react'
import './PrivacyPolicy.css';
import { FaCookie, FaFolder, FaPaperPlane, FaShield } from 'react-icons/fa6';
import { FaBook, FaDatabase, FaProcedures, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar></Navbar>
            <div className='cookie-container'>
            <div className='section'>
                <h1><FaUser className='icn'/> Owner and Data Controller</h1>
                <h6>NoSaintz Studio - Via Galileo Galilei, 10, Civesio / S. Giuliano Milanese, 20098, (MI)

                    Owner contact email: nicolo.casertano@gmail.com
                </h6>     
            </div>
            <div className='section'>
              <h1><FaFolder className='icn'/> Type of Data we collect</h1>
              <h6>The owner does not provide a list of Personal Data types collected.

                  Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.
                  Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using this Application.
                  Unless specified otherwise, all Data requested by this Application is mandatory and failure to provide this Data may make it impossible for this Application to provide its services. 
                  In cases where this Application specifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service.
                  Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.
                  Any use of Cookies – or of other tracking tools — by this Application or by the owners of third-party services used by this Application serves the purpose of providing the Service required by the User, 
                  in addition to any other purposes described in the present document and in the Cookie Policy.

                  Users are responsible for any third-party Personal Data obtained, published or shared through this Application.</h6>
            </div>  
            <div className='section'>
              <h1><FaDatabase className='icn'/> Mode and place of processing the Data</h1>
              <h3>Methods of processing</h3>
              <h6>The Owner takes appropriate security measures to prevent unauthorised access, disclosure, modification, or unauthorised destruction of the Data.
                  The Data processing is carried out using computers and/or IT enabled tools, following organisational procedures and modes strictly related to the purposes indicated. 
                  In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of this Application (administration, 
                  sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, 
                  communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.
              </h6>
              <h3>Place</h3>
              <h6>
                  The Data is processed at the Owner's operating offices and in any other places where the parties involved in the processing are located.

                  Depending on the User's location, data transfers may involve transferring the User's Data to a country other than their own. To find out more 
                  about the place of processing of such transferred Data, Users can check the section containing details about the processing of Personal Data.
              </h6>
              <h3>Retention time</h3>
              <h6>Personal Data shall be processed and stored for as long as required by the purpose they have been collected for.</h6>
            </div>
            <div className='section'>
              <h1><FaCookie className='icn'/>  Cookie Policy</h1>
              <h6>This Application uses Trackers. To learn more, Users may consult the <Link to="/cookies-policy">Cookies Policy</Link></h6>
            </div>
            <div className='section'>
              <h1><FaShield className='icn'/><br /> Further Information for Users <br/>in the European Union</h1>
              <h3>Legal basis of processing</h3>
              <h6>The Owner may process Personal Data relating to Users if one of the following applies:

                  Users have given their consent for one or more specific purposes.
                  provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual obligations thereof;
                  processing is necessary for compliance with a legal obligation to which the Owner is subject;
                  processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Owner;
                  processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party.
                  In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, 
                  or a requirement necessary to enter into a contract.
              </h6>
              <h3>Further information about retention time</h3>
              <h6>Personal Data shall be processed and stored for as long as required by the purpose they have been collected for.

                  Therefore:

                  Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall be retained until such contract has been fully performed.
                  Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long as needed to fulfill such purposes. Users may find specific information regarding the legitimate interests pursued by the Owner within 
                  the relevant sections of this document or by contacting the Owner.
                  The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn. 
                  Furthermore, the Owner may be obliged to retain Personal Data for a longer period whenever required to fulfil a legal obligation or upon order of an authority.

                  Once the retention period expires, Personal Data shall be deleted. Therefore, the right of access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period.
              </h6>
              <h3>The rights of Users based on the General Data Protection Regulation (GDPR)</h3>
              <h6>Users may exercise certain rights regarding their Data processed by the Owner.

                  In particular, Users have the right to do the following, to the extent permitted by law:

                  Withdraw their consent at any time. Users have the right to withdraw consent where they have previously given their consent to the processing of their Personal Data.
                  Object to processing of their Data. Users have the right to object to the processing of their Data if the processing is carried out on a legal basis other than consent.
                  Access their Data. Users have the right to learn if Data is being processed by the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.
                  Verify and seek rectification. Users have the right to verify the accuracy of their Data and ask for it to be updated or corrected.
                  Restrict the processing of their Data. Users have the right to restrict the processing of their Data. In this case, the Owner will not process their Data for any purpose other than storing it.
                  Have their Personal Data deleted or otherwise removed. Users have the right to obtain the erasure of their Data from the Owner.
                  Receive their Data and have it transferred to another controller. Users have the right to receive their Data in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted 
                  to another controller without any hindrance.
                  Lodge a complaint. Users have the right to bring a claim before their competent data protection authority.
                  Users are also entitled to learn about the legal basis of Data transfers to a country outside the European Union or to any international organisation governed by public 
                  international law or set up by two or more countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data.

                  If any such transfer takes place, Users can find out more by checking the relevant sections of this document or enquire with the Owner using the information provided in the contact section.
              </h6>
              <h3>Details about the right to object to processing</h3>
              <h6>Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by providing a ground related to their particular situation to justify the objection.

                  Users must know that, however, should their Personal Data be processed for direct marketing purposes, they can object to that processing at any time, free of charge and without providing any justification. 
                  Where the User objects to processing for direct marketing purposes, the Personal Data will no longer be processed for such purposes. 
                  To learn whether the Owner is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of this document.
              </h6>
              <h3>How to exercise these rights</h3>
              <h6>
                Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. Such requests are free of charge and will be answered by the Owner as early as possible and always within one month, providing Users with the information required by law. 
                Any rectification or erasure of Personal Data or restriction of processing will be communicated by the Owner to each recipient, if any, to whom the Personal Data has been disclosed unless this proves impossible or involves disproportionate effort. 
                At the Users’ request, the Owner will inform them about those recipients.
              </h6>
            </div>
            <div className='section'>
                    <h1><FaPaperPlane className='icn'/><br />Additional information about <br />Data collection and processing</h1>
                    <h3>Legal action</h3>
                    <h6>The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible legal action arising 
                        from improper use of this Application or the related Services.
                        The User declares to be aware that the Owner may be required to reveal personal data upon request of public authorities.
                    </h6>
                    <h3>Additional information about User's Personal Data</h3>
                    <h6>In addition to the information contained in this privacy policy, this Application may provide the User with additional and contextual 
                        information concerning particular Services or the collection and processing of Personal Data upon request.</h6>
                    <h3>System logs and maintenance</h3>
                    <h6>
                      For operation and maintenance purposes, this Application and any third-party services may collect files that record interaction with 
                      this Application (System logs) or use other Personal Data (such as the IP Address) for this purpose.
                    </h6>
                    <h3>Information not contained in this policy</h3>
                    <h6>More details concerning the collection or processing of Personal Data may be requested from the Owner at any time. 
                      Please see the contact information at the beginning of this document.</h6>
                    <h3>Changes to this privacy policy</h3>
                    <h6>The Owner reserves the right to make changes to this privacy policy at any time by notifying its Users on this page and possibly within this Application and/or - as far as technically and legally feasible - sending a notice to Users via any contact information available to the Owner. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom.
                        
                        Should the changes affect processing activities performed on the basis of the User’s consent, the Owner shall collect new consent from the User, where required.</h6>
            </div>
            <div className='section'>
              <h1><FaBook className='icn'/> Definitions and legal references</h1>
              <h3>Personal Data (or Data)</h3>
              <h6>
                Any information that directly, indirectly, or in connection with other information — including a personal identification number — 
                allows for the identification or identifiability of a natural person.
              </h6>
              <h3>Usage Data</h3>
              <h6>
                Information collected automatically through this Application (or third-party services employed in this Application), which can include: the IP addresses or domain names of the computers utilised by the 
                Users who use this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilised to submit the request to the server, the size of the file received in response, the numerical 
                code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilised by the User, the various time details per visit (e.g., the time spent on 
                each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment.
              </h6>
              <h3>User</h3>
              <h6>The individual using this Application who, unless otherwise specified, coincides with the Data Subject.</h6>
              <h3>Data Subject</h3>
              <h6>The natural person to whom the Personal Data refers.</h6>
              <h3>Data Processor (or Processor)</h3>
              <h6>The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Controller, as described in this privacy policy.</h6>
              <h3>Data Controller (or Owner)</h3>
              <h6>The natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal 
                Data, including the security measures concerning the operation and use of this Application. The Data Controller, unless otherwise specified, is the Owner of this Application.</h6>
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
        <Footer/>
    </div>
  )
}

export default PrivacyPolicy