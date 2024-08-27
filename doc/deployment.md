# Deployment

[Back to home](../README.md)

**Note on eas**

* Deployment is done with eas.
* All env vars are setup directly inside the encrypted `eas.json` file
>  This is the case because for some reason, I was not able to have the dotenv module that injects env variables directly in the js runtime using `eas` work properly
* The above file is completely ignored on dev environment, so the dev environment are read from the `.ENV` file
* This means the variables stored in the `.ENV.*` files is only used for the dev environment

**Note on application bundles**

* 🍏 Apple app bundles are outputed to a `.ipa` file
* 🤖 Android app bundles are outputed to two different format
  * `.aab` Android App Bundle is a new format, it can only be submited to the play store
  * `.apk` Android App Package is the old format. It is heavier, so you should prefer aab to submit to the play store. However, this bundles can be submited to the play store, or downloaded and installed directly on a device, which is convenient

**Note on bundle ids**

The application has 3 bundle ids, the bundle id identifies the application on the device, that explains you can have 3 versions of the application on a single device. If you try to install an application and its bundle id already correspond to an installed application on your device, it will be upgraded.

* com.reconnect.CloudSolidaire.debug
* com.reconnect.CloudSolidaire.preprod
* com.reconnect.CloudSolidaire.prod

> For Android, this bundle identifier is called applicationId, it is setup inside the `app/build.gradle` file, and it shoud not be mistaken with the `packageName` which is `com.reconnect.CloudSolidaire` and it the same for the 3 plateforms

**Note on application signing**

⚠️⚠️⚠️⚠️
> Application signing credentials is stores inside the encrypted `credentials.json` file, but I did not succeed in configuring the preprod and the prod environment
> The best of the worsts solution I found is to commit an extra file, `credentials.prod.json`. The `credentials.json` it the one used by `eas`, it will be committed with the preprod credentials. If you want to dpeloy in the production environemnt, you will need to copy the content of the `credentials.prod.json` inside the `credentials.json` before deploy.
> For iOS, you have also to update the bundleIds inside the Info.plist, update the `com.reconnect.CloudSolidaire.preprod` to `com.reconnect.CloudSolidaire.prod` we could have multiple targets in our Info.plist, but I dit not succeed configuring these

* 🍏 Apple packages are signed with a provisioning profile, it ensures the identity of the developper that built the package
  * For debug, preprod, and prod, 3 different provisioning profile exist and you need to use the right one while building
  * Obtaining these provisioning profiles is a really complex workflow, however, Expo abstracts all this complexity
* 🤖 Android packages are signed with a keystore
  * Keystores are not needed on the debug environment

**Bump version**

Before deploying, you have to bump the version number, on the stores, you can not have multiple application with the same version number.
You have to bump it manually on multiple places because I did not succeed in automating this task

* buildNumber and versionCode in `app.config.js`
* version in `app.json`
* versionCode and versionName in `app/build.gradle`
* CFBundleShortVersionString and CFBundleVersion in `Info.plist`

**Do deploy**

1. Bump the version number
2. Prepare the appropriate credentials, see **Note on application signing**
3. Build the bundle
   * `npx eas build --platform {ios/android} --profile {preprod/prod}`
4. Preprod builds
   * You can share the expo link and qrcode to be installed directly to the devices
5. Prod builds
   * 🍏 [Apple] You can automatically submit the build via `eas submit -p ios`
     * The build will appear into testflight, you can click "handle" and check that application uses no of the above cryptographic technologies, and test it with a device with testflight
     * When it is ready, draft a new release in production and pick the testflight build
   * 🤖 [Android] You can automatically submit the build via `eas submit -p android`
     * The build will appear in the section "open tests", it should now be available to beta users
     * When it is ready, promote it to production
