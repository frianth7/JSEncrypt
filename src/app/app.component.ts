import { Component } from '@angular/core';
import { privateKey, publicKey } from './config';
import { JSEncrypt } from 'jsencrypt';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  plainText: string = ''; // 
	cypherText: string = ''; // 

	$encrypt: any; // JSEncrypt 

	constructor(private _message: NzMessageService) { }

	ngOnInit() {
		this.$encrypt = new JSEncrypt();

	}

	encrypt() {
		const text = `${this.plainText}`.trim();

		// 1024 127
		if (text.length > 117) {
			this._message.error('Masukkan Teks');
		} else {
			this.$encrypt.setPublicKey(publicKey);
			this.cypherText = this.$encrypt.encrypt(text);
		}
	}

	decrypt() {
		this.$encrypt.setPrivateKey(privateKey);
		this.plainText = this.$encrypt.decrypt(this.cypherText);
1
		if (Object.is(this.plainText, null)) {
			this._message.error('Key Salah');
		}
	}
}
