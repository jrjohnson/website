---
layout: post
title: 'Production Packer Passwords: Securing the Root User'
date: 2014-06-09 17:21:00
categories: devops vagrant packer
originalURI: https://blogs.library.ucsf.edu/ckm/2014/06/09/production-packer-passwords-securing-the-root-user/
---

[Packer](http://packer.io/) is a tool for creating identical machine images for multiple platforms from a single source configuration. It is mostly used to create base images for developers using [Vagrant](http://www.vagrantup.com). However it's just as useful for creating virtual machine (VM) images to deploy in production. Using Packer in this way, you can create a consistent starting point for VMs which are then provisioned further with, for example, Puppet or Chef, creating a ready-to-deploy image with your application already installed.

One minor headache for using Packer in this way is how to safely create a root account with a known password without exposing that password in configuration files.

The key to this process is hooking into the scripted install process. For Debian this is known as [Preseed](https://wiki.debian.org/DebianInstaller/Preseed). Redhat calls it [Kickstart](https://access.redhat.com/site/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Installation_Guide/ch-kickstart2.html). Most Packer VMs are [built with some kind of Preseed/Kickstart file](https://github.com/shiguredo/packer-templates).

You can override the options in the file with some passed on the command line of the Packer boot process. This will allow you to use a dynamic root password instead of a hash stored in a file.

First update your Packer JSON file to prompt for the root password by adding it to the [variables section](http://www.packer.io/docs/templates/user-variables.html):

```javascript
"variables": {
    "root_password": null
  }
```

Now, when you run the Packer install, you will be prompted for a root password. You have access to it in your Packer scripts as `root_password`.

The next step is to replace static SSH credentials with your new root ones. Change the `ssh_username` and `ssh_password` lines in your builder section to:

```javascript
"ssh_username": "root",
"ssh_password": "{{user `root_password`}}",
```

All that is left is ensuring that your distribution sets the root password on install. This is done by modifying the `boot_command` property in the builder section of your Packer file.

```javascript
[
  'passwd/root-password="{{user `root_password`}}" passwd/root-password-again="{{user `root_password`}}" ',
];
```

My full Ubuntu `boot_command` looks like this:

```javascript
"boot_command": [
  "",
  "/install/vmlinuz noapic preseed/url=http://{{ .HTTPIP }}:{{ .HTTPPort }}/preseed.cfg ",
  "debian-installer=en_US auto locale=en_US kbd-chooser/method=us ",
  "hostname={{ .Name }} ",
  "fb=false debconf/frontend=noninteractive ",
  "keyboard-configuration/modelcode=SKIP keyboard-configuration/layout=USA keyboard-configuration/variant=USA console-setup/ask_detect=false ",
  "passwd/root-password=\"{{user `root_password`}}\" passwd/root-password-again=\"{{user `root_password`}}\" ",
  "initrd=/install/initrd.gz -- "
]
```

Make sure you remove `passwd/root-password` and `passwd/root-password-again` from your `preseed.cfg` if they are present.

That's it! You can now safely build production VMs without exposing your root password in configuration or source files. Enjoy!
