---
layout: post
title:  "See your failures: Taking screenshots with PhantomJS running Behat tests"
date:   2014-05-14 14:04:00
categories: testing php
originalURI: https://blogs.library.ucsf.edu/ckm/2014/05/14/see-your-failures-taking-screenshots-with-phantomjs-running-behat-tests/
---


[PhantomJS][phantomjs] is a headless browser which, when combined with [Behat][behat], can run the same tests you can run in a browser like Chrome or Firefox. Headless testing is faster because it doesn't actually render anything for a user. This makes it ideal for rapid test driven development.  

A downside to headless testing is that when it fails it can be hard to see exactly why.  Figuring out whether it is your code or your test that is causing the issue can be extremely frustrating and you might find yourself asking; Why can't I just see it?  The frustration mounts when the same test runs just fine via Selenium in a GUI browser.

OK, was that enough buildup?  Are you ready for the good stuff?  Right then, here we go.


Any Selenium2 Behat driver already has a method of taking screen shots at any point built in.
```php
$screenshot = $this-&gt;getSession()-&gt;getDriver()-&gt;getScreenshot();
```

In any method of your [FeatureContext][featurecontext] class, this will return a nice PNG of whatever the browser looks like right then.  

So all we really need to do to start seeing the last step in our failed tests is wrap this up in a reusable method Behat will understand.  [Using Behat's hook system][http://docs.behat.org/guides/3.hooks.html], we can add a method to our [FeatureContext][featurecontext] class which is called after every single step.  In the method, check to see if the step failed. If so, take a screenshot to save to disk and BAM!&hellip; we're done.  The full method looks something like this:

```
 public function takeScreenshotAfterFailedStep($event)
 {
   if ($event-&gt;getResult() == 4) {
     if ($this-&gt;getSession()-&gt;getDriver() instanceof \Behat\Mink\Driver\Selenium2Driver) {
       $screenshot = $this-&gt;getSession()-&gt;getDriver()-&gt;getScreenshot();
       file_put_contents('/tmp/screenshot.png', $screenshot);
     }
   }
 }
 ```

For the [Ilios Project][iliosproject] we made this code a little bit more generic to store the screen shot in the system temp directory (which changes for different operating systems) and give it a unique name so that if more than one step fails in a single test run, you won't overwrite the screenshot file.

```php
 public function takeScreenshotAfterFailedStep($event)
 {
   if ($event-&gt;getResult() == 4) {
     if ($this-&gt;getSession()-&gt;getDriver() instanceof
     \Behat\Mink\Driver\Selenium2Driver) {
       $stepText = $event-&gt;getStep()-&gt;getText();
       $fileTitle = preg_replace("#[^a-zA-Z0-9\._-]#", '', $stepText);
       $fileName = sys_get_temp_dir() . DIRECTORY_SEPARATOR . $fileTitle . '.png';
       $screenshot = $this-&gt;getSession()-&gt;getDriver()-&gt;getScreenshot();
       file_put_contents($fileName, $screenshot);
       print "Screenshot for '{$stepText}' placed in {$fileName}\n";
     }
   }
 }
 ```

[phantomjs]:      http://phantomjs.org
[behat]:          http://behat.org
[featurecontext]: http://docs.behat.org/guides/4.context.html
[iliosproject]:   https://www.iliosproject.org/
