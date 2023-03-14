import admin from 'firebase-admin'
const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "signatext",
    "private_key_id": "8f2c6ad32f8701e8ed48ef7981e278c3774b8eff",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcynFJH7iHzY2W\nEOLq8XaRK3zdJM1a0SVIJ3KZbeIBOejx4CoPmABU1lnvD2CnJ2mLUYzECiUCOotj\noJdPdPTz53QQa9Sk72kCPLQGlkF7bKw7lyPt2hl2ObPwrDalfMbmOTjIk9d1MT7D\n5rvWTZViVQsoCWS2eTQTlAtI2za1KQDru9VqJIFcMqRg7fuSRYaXT4r+JP4vps7q\nPVLiQfQauN8iDIm3BJ9SOS7MptHhAxTyv86oKe12evR96uk647akuA8WG/PP/UM4\nQTIelJNue/bs64mLs03+iqI1gxurXQmVkVgULmdhgvtAkI3A4MzIHVQ5ixHuMKHh\nvQsSpKxrAgMBAAECggEAatMF+a+/y/Dvop479Bls2PMWADcoplqPs7fmUgagtSAs\nLS7cmtvbuTBWpfwmMum2PqJvvX/9BPWHcGYIH3kCdSnUdYd+hGiTQXJWVeOH/iwH\nrvNC/ncqH5HuljD0ZaAX6dbguucQ9VIkwIrX8elqr/9enPnigQjmYdyckx0A/KfZ\n+s4WSGj2Grs1oFNE4oN8+Q7/3ATKD7eftjHdOjBwLLGiwVojLCo1PEF6sggyOvis\nzuKoCSznmE2K6378Qxnk43rIcecHnZI7WHkXxNeCwNsSlMAyNxrLAu9wXdQuiFzL\nICFttnBVuTs9QOdmSVovBu/rOzQt2ow1MQbGC+A8PQKBgQD/CRUzh5AG7XxMSgn9\n9Sv7A9UhRLfqHC9+5nc8uWfIxUt3Ok3WlPfe4/QEPk6vYuP4t6+KWhpdIN/bRm2I\n1S5MJF7x4NbW7OvSD1Cpa+hwF3dJUmv81cExG3LByYaNcAd9nGMO+JZtUS2xR6+L\nFr0q1ageluaWrt3NVejWbmU/bwKBgQDdoDSBB6GtqmbI1QgPw8bx5ElYv+I7pPlc\nnndg0bqxDgS1ZCWiGXPT0t1ksIMsNTO4Q3sB/oVNWsad/WvqWWlQm0KHagCmJw+L\noJw2QF1qiqVdzU6OPPzi1BCUa1o1t5RQjHQ1MQEa7C8lRtodM0fcDSpi9peKAQP2\nP1D0E4TkxQKBgQD1IrTXN9kvX3vXFF9wVAU3HCLy/EtO4lKgxkMcAhYIu+Lisg75\nT2zFOBRnM8CMAiCgA2beM+cdVqj06kgEeuwqUddU5Ml8AnRVD1V303myrEuDFY8o\nkglE+14deGg1cNYyXWw1iqmEX7/so7vOlEe1cXJMHL19Xo1hfc70tV3qTwKBgBJ3\nqAhcb29+NIRlo/9US/6aDDaV/q8Dpze9iKsLrufUCDZpOu2P+2PaPVKHltaXNFEV\nZmmbINZ6SvSdSmHDw4/Q8DFCdv1hYd07q+ilYmNfXDo9wl793AC2tQ75BxJU0soH\neiN4iuQIbEFJ7yDhxgojGrYWYDhCr2bUjdVYzwkVAoGAdQ08dzrdLkaGdxf1s37l\n+FhMU5KPLuQb8Z1eUET8kfoYrD4Ga0m3kjQ66fFCkrfcJrRmNlv4nOB/Lik9e+vt\nCRJnx8buWQiEQmbsvsk7FMr2iu2Ww6YRElKIlAledSjD/lMvidDCYRoAgiIFmZe1\nV4Ps2lHmfICgWCFvEhbtKFU=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-xg2a7@signatext.iam.gserviceaccount.com",
    "client_id": "112166862529747134224",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xg2a7%40signatext.iam.gserviceaccount.com"
  }
  ),
  storageBucket: 'gs://signatext.appspot.com/'
});
export default serviceAccount