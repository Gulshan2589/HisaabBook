import React, { Fragment } from 'react';
import './contact.css'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FiMail } from 'react-icons/fi';

const Contact = () => {
  return (
    <Fragment>
      <section className='contact'>

        <div className='contact-heading'>
          <h2>Contact Us</h2>
        </div>

        <div className='container'>
          <div className='row'>

            <div className='column'>
              <div className='contact-widget'>

                <div className='contact-widget-item'>
                  <div className='icon'>
                    <ImLocation className='reacticon' />
                  </div>
                  <div className='text'>
                    <h5>Address</h5>
                    <p>Hanuman Nager, G.A.K Vaidya Marg, Goregoan East, Mumbai-400065</p>
                  </div>
                </div>

                <div className='contact-widget-item'>
                  <div className='icon'>
                    <BsFillTelephoneFill className='reacticon' />
                  </div>
                  <div className='text'>
                    <h5>Contact Us</h5>
                    <p>12456-711-234</p>
                  </div>
                </div>

                <div className='contact-widget-item'>
                  <div className='icon'>
                    <FiMail className='reacticon' />
                  </div>
                  <div className='text'>
                    <h5>Mail</h5>
                    <p>myexample123@gmail.com</p>
                  </div>
                </div>

              </div>
            </div>

            <div className='column'>
              <div className='contact-form'>
                <form action='https://formspree.io/f/mvonklyb' method='POST'>
                  <input className='input'
                    type='text' name='username' placeholder='Name' required />
                  <input className='input'
                    type='email' name='Email' placeholder='Email' required />
                  <textarea className='textarea'
                    name='message' placeholder='Comment'></textarea>
                  <button type='submit' className='btn'>Send Message</button>
                </form>
              </div>
            </div>

          </div>

          <div className='row'>
            <div className='map-column'>
              <div className='contact-map'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15074.106929200178!2d72.86598841272807!3d19.172182910196895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7a1e6bb9d47%3A0x8d0720c19960ef61!2sHanuman%20nagar%2C%20Muncipal%20Colony%2C%20Sector%20A%2C%20Goregaon%2C%20Mumbai%2C%20Maharashtra%20400065!5e0!3m2!1sen!2sin!4v1676305065975!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>

      </section>
    </Fragment>
  );
}

export default Contact;