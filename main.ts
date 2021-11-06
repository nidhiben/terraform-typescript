import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { Image, Container} from './.gen/providers/docker'


class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const image = new Image(this, 'nginxImage', {
      name: 'nginx:latest',
      keepLocally: false
    })

    new Container(this, 'nginxContainer', 
    {
      image: image.latest,
      name: 'cdktf-tutorial',
      ports: [
        { 
        internal: 80,
        external: 8000 
      }
      ]
    })

  }
}

const app = new App();
new MyStack(app, "terraform-typescript");
app.synth();
