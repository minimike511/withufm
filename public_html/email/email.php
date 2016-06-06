<?php
/**
 * Created by PhpStorm.
 * User: Michael
 * Date: 2016-05-15
 * Time: 오후 10:11
 */

require '../../vendor/autoload.php';
$getPost = (array)json_decode(file_get_contents('php://input'));

$sendgrid = new SendGrid('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');
$email    = new SendGrid\Email();

$email
    ->addTo($getPost['sendTo'])
    ->addToName($getPost['toName'])
    //->addTo('bar@foo.com') //One of the most notable changes is how `addTo()` behaves. We are now using our Web API parameters instead of the X-SMTPAPI header. What this means is that if you call `addTo()` multiple times for an email, **ONE** email will be sent with each email address visible to everyone.
    ->setFrom($getPost['sendFrom'])
    ->setFromName($getPost['fromName'])
    ->setSubject($getPost['subject'])
    ->setText($getPost['msg'])
    ->setHtml($getPost['msgHTML']);

try {
    $sendgrid->send($email);
    echo '{success:true, message:"Sent!"}';
} catch (\SendGrid\Exception $e) {
    echo '{success:false, message:"Failed to send : ' . $e . '"}';
}