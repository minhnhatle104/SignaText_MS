import * as dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin'


const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "signatext-v02",
    "private_key_id": "57ea0358fdfc6179d25c2285965aca4b438b70de",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWIeZwREjLSTUW\nxqwNvOC+Mc4QReTRe5QnoG5OGcfenMHTs/aQQ3c/RZIrCoWx+3VTTlJ8mesNlHtF\n/EIpktSIMS9OUDjo/9hhOoKI/20vmrOv7gDsg67riEtegbodD8cxn1o1ZjmLPc/R\nBHsn3tTAPJU3dOE33qTA0qlMjqP9Xq6JERqYeWH3ubdHeX50k1bZWSLI3wUcb/gV\nk7Pfvo2yH0Kt/QMmAAcfwjwQSUleKm0vRL4GOo1K1ESKsofEe9o6dcc+N6Z0ufmf\nHLJmNIaigZcQFUANlE8z6ZSPknjf0o4/+rUj1qdwBXowunz50z6BUnngtINdQfaN\nM+wyQPfrAgMBAAECggEABy5/4ggIQPkllKv5HUTWbMqS1KzjbbstTt7slCX9NBQh\n1A3XGSOKHk8hBdyGe1+poa+gyJkI7x2pvMEnHunTwvWTVpcOMZJTGX+y3RFkAhK4\nMBBVa5lHBpM9o9/J9CuRTLLBfcT97ROXorT5xG6OyBvADWoYG52V/PmTwAOQsHCq\nyVxjBZpCVRKYGoijDdAn9VYG2X68msjfQw8MRfuX0/FjKYbbnFeA+rGGvdrmYdyX\n8rEcPR0YJZS+XTFjpk0OBKDx2K522cqkXwzW2F+XU6fpKY4sw7157iU0+5LS3W8U\n/8sJ8hP0LZbrmktKCsh/rGVIJLtZh1KoPPsCOfy50QKBgQDrFH5Q0XZ6O2E/975X\npPSCeDrbJ/5o60SMC3zb64fDeNL4hu2FFFrK3OcP5jI1FLiq+k5sdeLiL02lDuas\nc59RAzrq8l/nG4/cGbWX1bkj7ydKiTcnEMYeMRlZHJ5XwpsII30/70OT9+RdjEDi\nnG5rqEbTbGqx+huKYjPwS9TchQKBgQDpMC+C9xSdvStfL/cQoR/nih4GdhCVfhm2\nloPv0548pqNHt3r6UZLpi3lnZyl0K0gVrqqBSk40Ot5yiKL+hpad+/OGnkRZ/XIT\nEx8jRltGXqbXMA76P90jT8illA2zmk+y93LF57difSBGMnbEwFR29zdhRQ+NhhG9\n+MXXchMlrwKBgG5h2BIw2LX6beaweNMEpL8in1hKxj4TwsMTndRSGxShBkcmbB8h\n+KPq6CBiEc805KV8FRj+ncNhPM81WQE+5V8P6jlqB7goC/voookiFOYXpNZt6dTR\nHoYMvf9G3d8NhOhkaap8ubmgG74FXm5Jz9uDT4Z1EQBzFT18cTDzGodVAoGBAIC4\n0bFY1S+R6iw8XQT3/JWiv5pPeC4dkvIguiocRgAy+HUxSph9iTyUemrjHpX7Amq9\npW+DZhIc4QiWdmtMPj5tg2uvWAnZByySZKDjSKVawHyPEeWAdYD1nMwSI1Ief5pK\nUDgBBlE+wx8c4kUP6lBVfWObbM9xz79vYT7hwMIPAoGBALiO2zrnMd2CmoToaYRy\nC6JrJbswGm79Dp/bEHSaPhj/ZS5PwxmI+Mog3nNdwaYLEAVVsNAQrzBNUGPsTnSh\nssqvmj/GgBcXTfrUVEWCHHjDjgYUE/EjYPPWssuYw+m0YahoD8kXJHt2uc3gD5g2\n2tSWGju//Cp0f9LHoK3QosK6\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-tvtbh@signatext-v02.iam.gserviceaccount.com",
    "client_id": "111066152247248824639",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tvtbh%40signatext-v02.iam.gserviceaccount.com"
  }
  ),
  storageBucket: "signatext-v02.appspot.com"
});

export default serviceAccount