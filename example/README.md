# Outqource-Template Next.js

## Scripts

```shell
node scripts/create-containers.js
```

- 구현 동기 : Next.js `pages/` 폴더에서 커스텀 useHook 을 못씀
- 구현 방향 : containers 폴더로 옮기고, 그에 맞는 containers 폴더로 이관하는 기능을 해준다.

```shell
node scripts/create-container.js <PATH>/<FILENAME>

# example
node scripts/create-container.js users/idx/index
node scripts/create-container.js settings/users/update
```

- 구현 동기 : Next.js `pages/` 폴더에서 커스텀 useHook 을 못써서, containers 폴더에서 생성해야하는등 파일들이 많아짐
- 구현 방향 : 최소기능을 한번에 만들어주는 script를 생성
- 수정 해야할 것 : 대괄호[]는 쓰지 못해서 제외하고 그다음 수정해주어야 한다.
