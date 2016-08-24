<?php
 
	include 'defines.php';
	include 'email_validation.php';
 
	$post = (!empty($_POST)) ? true : false;
 
	if($post){
 
		$name = stripslashes($_POST['name']);
		$email = stripslashes($_POST['email']);
		$messanger = stripslashes($_POST['message']);
		$subject = 'Вопрос';
		$error = '';	
		$message = '
			<html>
					<head>
							<title>Вопрос</title>
					</head>
					<body>
							<p>Имя: '.$name.'</p>
							<p>Email : '.$email.'</p>
							<p>Сообщение : '.$messanger.'</p>
					</body>
			</html>';
 
		if (!ValidateEmail($email)){
			$error = 'Email введен неправильно!';
		}
 
		if(!$error){
			$mail = mail(CONTACT_FORM, $subject, $message,
			     "From: ".$name." <".$email.">\r\n"
			    ."Reply-To: ".$email."\r\n"
			    ."Content-type: text/html; charset=utf-8 \r\n"
			    ."X-Mailer: PHP/" . phpversion());
 
			if($mail){
				echo 'OK';
			}
		}else{
			echo '<div class="bg-danger">'.$error.'</div>';
		}
 
	}
?>