# Shared web timer for MIDL chairs and speakers
The screen turns orange when less than a minute is left
and red when time is over.

## Usage

### Speaker
Go the base URL:
[`https://sharedwebtimer.firebaseapp.com/`](https://sharedwebtimer.firebaseapp.com/).

### Chair
Add `admin=True` to the URL parameters:
[`https://sharedwebtimer.firebaseapp.com/?admin=true`](https://sharedwebtimer.firebaseapp.com/?admin=true).

If you want more control over the duration, add a `seconds` **or** `minutes`
parameter:

* 5 minutes:
[`https://sharedwebtimer.firebaseapp.com/?admin=true&minutes=5`](https://sharedwebtimer.firebaseapp.com/?admin=true&minutes=5)
* 30 seconds:
[`https://sharedwebtimer.firebaseapp.com/?admin=true&seconds=30`](https://sharedwebtimer.firebaseapp.com/?admin=true&seconds=30)
