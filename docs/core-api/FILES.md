# Files API
> The files API enables users to use the File System abstraction of IPFS. There are two Files API, one at the top level, the original `add`, `cat`, `get` and `ls`, and another behind the [`files`, also known as MFS](https://github.com/ipfs/specs/issues/98). [We are currently going through a revamping process of these APIs to make them more user-friendly](https://github.com/ipfs/interface-ipfs-core/issues/284).
#### The Regular API
- [add](#add)
- [cat](#cat)
- [get](#get)
- [ls](#ls)

#### The Files API
The Files API, aka MFS (Mutable File System)
- [files.chmod](#fileschmod)
- [files.cp](#filescp)
- [files.flush](#filesflush)
- [files.ls](#filesls)
- [files.mkdir](#filesmkdir)
- [files.mv](#filesmv)
- [files.read](#filesread)
- [files.rm](#filesrm)
- [files.stat](#filesstat)
- [files.touch](#filestouch)
- [files.write](#fileswrite)

_Explore the Mutable File System through interactive coding challenges in our [ProtoSchool tutorial](https://proto.school/#/mutable-file-system/)._
#### `add`
##### `ipfs.add(data, [options])`
Where `data` may be:
`options` is an optional object argument that might include the following keys:
- `chunker` (string, default `size-262144`): chunking algorithm used to build ipfs DAGs. Available formats:
  - size-{size}
  - rabin
  - rabin-{avg}
  - rabin-{min}-{avg}-{max}
- `cidVersion` (integer, default `0`): the CID version to use when storing the data (storage keys are based on the CID, including its version).
- `enableShardingExperiment`: allows to create directories with an unlimited number of entries currently size of unixfs directories is limited by the maximum block size. Note that this is an experimental feature.
- `hashAlg` (string, default `sha2-256`): multihash hashing algorithm to use. [The list of all possible values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343).
- `onlyHash` (boolean, default `false`): doesn't actually add the file to IPFS, but rather calculates its hash.
- `pin` (boolean, default `true`): pin this object when adding.
- `progress` (function): a function that will be called with the byte length of chunks as a file is added to ipfs.
- `rawLeaves` (boolean, default `false`): if true, DAG leaves will contain raw file data and not be wrapped in a protobuf.
- `shardSplitThreshold` (integer, default `1000`): specifies the maximum size of unsharded directory that can be generated.
- `trickle` (boolean, default `false`): if true will use the trickle DAG format for DAG generation.
  [Trickle definition from go-ipfs documentation](https://godoc.org/github.com/ipsn/go-ipfs/gxlibs/github.com/ipfs/go-unixfs/importer/trickle).
- `wrapWithDirectory` (boolean, default `false`): adds a wrapping node around the content.

**Returns**
**Example:**
###### Importing files from the file system
###### Importing a file from a URL
#### `cat`
##### `ipfs.cat(ipfsPath, [options])`
`ipfsPath` can be of type:
- [`CID`][cid] of type:
  - `string` - the base encoded version of the CID
  - [CID](https://github.com/ipfs/js-cid) - a CID instance
  - [Buffer][b] - the raw Buffer of the CID
- `string` - including the ipfs handler, a CID and a path to traverse to, e.g.
  - '/ipfs/QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66'
  - '/ipfs/QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66/a.txt'
  - 'QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66/a.txt'
`options` is an optional object that may contain the following keys:
  - `offset` is an optional byte offset to start the stream at
  - `length` is an optional number of bytes to read from the stream
**Returns**
**Example:**
#### `get`
##### `ipfs.get(ipfsPath)`
`ipfsPath` can be of type:
- [`CID`][cid] of type:
  - `string` - the base encoded version of the CID
  - [CID](https://github.com/ipfs/js-cid) - a CID instance
  - [Buffer][b] - the raw Buffer of the CID
- String, including the ipfs handler, a cid and a path to traverse to, e.g.
  - '/ipfs/QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66'
  - '/ipfs/QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66/a.txt'
  - 'QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66/a.txt'
**Returns**
**Example:**
  
#### `ls`
##### `ipfs.ls(ipfsPath)`
`ipfsPath` can be of type:
- [`CID`][cid] of type:
  - `string` - the base encoded version of the CID
  - [CID](https://github.com/ipfs/js-cid) - a CID instance
  - [Buffer][b] - the raw Buffer of the CID
- String, including the ipfs handler, a cid and a path to traverse to, e.g.
  - '/ipfs/QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66'
  - '/ipfs/QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66/a.txt'
  - 'QmXEmhrMpbVvTh61FNAxP9nU7ygVtyvZA8HZDUaqQCAb66/a.txt'
**Returns**
**Example:**
## The Files API aka MFS (The Mutable File System)
#### `files.chmod`
##### `ipfs.files.chmod(path, mode, [options])`
Where:
- `path` is the path to the entry to modify.  It might be:
  - An existing MFS path to a file or a directory (e.g. `/my-dir/my-file.txt`)
  - An IPFS path (e.g. `/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks`)
  - A [CID][cid] instance (e.g. `new CID('QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks')`)
- `mode` is the new file mode.  It might be:
  - A string modification of the existing mode, e.g. `'a+x'`, `'g-w'`, etc
  - An integer, e.g. the returned value from `parseInt('0755', 8)` or `0o755`
- `options` is an optional Object that might contain the following keys:
  - `recursive` is a Boolean value that indicates if `mode` should be applied to all sub files/directories of `path` (default: false)
  - `hashAlg` is which algorithm to use when creating CIDs for modified entries. (default: `sha2-256`) [The list of all possible values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343)
  - `flush` is a Boolean value to decide whether or not to immediately flush MFS changes to disk (default: true)
  - `cidVersion`: the CID version to use for any updated entries (integer, default 0)
**Returns**
**Example:**
#### `files.cp`

> Copy files.

##### `ipfs.files.cp(...from, to, [options])`
Where:
- `from` is the path(s) of the source to copy.  It might be:
  - An existing MFS path to a file or a directory (e.g. `/my-dir/my-file.txt`)
  - An IPFS path (e.g. `/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks`)
  - A [CID][cid] instance (e.g. `new CID('QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks')`)
- `to` is the path of the destination to copy to
- `options` is an optional Object that might contain the following keys:
  - `parents` is a Boolean value to decide whether or not to make the parent directories if they don't exist (default: false)
  - `hashAlg` is which algorithm to use when creating CIDs for newly created directories. (default: `sha2-256`) [The list of all possible values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343)
  - `flush` is a Boolean value to decide whether or not to immediately flush MFS changes to disk (default: true)

If `from` has multiple values then `to` must be a directory.
If `from` has a single value and `to` exists and is a directory, `from` will be copied into `to`.
If `from` has a single value and `to` exists and is a file, `from` must be a file and the contents of `to` will be replaced with the contents of `from` otherwise an error will be returned.
If `from` is an IPFS path, and an MFS path exists with the same name, the IPFS path will be chosen.
If `from` is an IPFS path and the content does not exist in your node's repo, only the root node of the source file with be retrieved from the network and linked to from the destination. The remainder of the file will be retrieved on demand.
**Returns**
**Example:**
#### `files.mkdir`
> Make a directory.
##### `ipfs.files.mkdir(path, [options])`
Where:
- `path` is the path to the directory to make
- `options` is an optional Object that might contain the following keys:
  - `parents` is a Boolean value to decide whether or not to make the parent directories if they don't exist  (default: false)
  - `hashAlg` is which algorithm to use when creating CIDs for newly created directories (default: `sha2-256`) [The list of all possible values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343)
  - `flush` is a Boolean value to decide whether or not to immediately flush MFS changes to disk  (default: true)
  - `mode`: optional UnixFS mode to create the directory with - a number or a string that will be interpreted as a base 8 number
  - `mtime`: A Date object, an object with `{ secs, nsecs }` properties where `secs` is the number of seconds since (positive) or before (negative) the Unix Epoch began and `nsecs` is the number of nanoseconds since the last full second, or the output of [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime_time)
**Returns**
**Example:**
#### `files.stat`
> Get file or directory status.
##### `ipfs.files.stat(path, [options])`
Where:
- `path` is the path to the file or directory to stat. It might be:
  - An existing MFS path to a file or directory (e.g. `/my-dir/a.txt`)
  - An IPFS path (e.g. `/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks`)
  - A [CID][cid] instance (e.g. `new CID('QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks')`)
- `options` is an optional Object that might contain the following keys:
  - `hash` is a Boolean value to return only the hash  (default: false)
  - `size` is a Boolean value to return only the size  (default: false)
  - `withLocal` is a Boolean value to compute the amount of the dag that is local, and if possible the total size  (default: false)
**Returns**
**Example:**
#### `files.touch`
##### `ipfs.files.touch(path, [options])`
Where:
- `path` is the path to the file or directory to update. It might be:
  - An existing MFS path to a file or directory (e.g. `/my-dir/a.txt`)
  - An IPFS path (e.g. `/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks`)
  - A [CID][cid] instance (e.g. `new CID('QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks')`)
- `options` is an optional Object that might contain the following keys:
  - `mtime` Either a ` Date` object, an object with `{ sec, nsecs }` properties or the output of `process.hrtime()`  (default: now)
  - `hashAlg` is which algorithm to use when creating CIDs for modified entries. (default: `sha2-256`) [The list of all possible values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343)
  - `flush` is a Boolean value to decide whether or not to immediately flush MFS changes to disk (default: true)
  - `cidVersion`: the CID version to use for any updated entries (integer, default 0)
**Returns**
**Example:**
#### `files.rm`
##### `ipfs.files.rm(...paths, [options])`
Where:
- `paths` are one or more paths to remove
- `options` is an optional Object that might contain the following keys:
  - `recursive` is a Boolean value to decide whether or not to remove directories recursively  (default: false)
**Returns**
**Example:**
#### `files.read`
##### `ipfs.files.read(path, [options])`
Where:
- `path` is the path of the file to read and must point to a file (and not a directory). It might be:
  - An existing MFS path to a file (e.g. `/my-dir/a.txt`)
  - An IPFS path (e.g. `/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks`)
  - A [CID][cid] instance (e.g. `new CID('QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks')`)
- `options` is an optional Object that might contain the following keys:
  - `offset` is an Integer with the byte offset to begin reading from  (default: 0)
  - `length` is an Integer with the maximum number of bytes to read (default: Read to the end of stream)
**Returns**
**Example:**
#### `files.write`
> Write to a file.
##### `ipfs.files.write(path, content, [options])`
Where:
- `path` is the path of the file to write
- `content` can be:
  - a [`Buffer`][b]
  - an `AsyncIterable` (note: Node.js readable streams are iterable)
  - a [`Blob`][blob] (caveat: will only work in the browser)
  - a string path to a file (caveat: will only work in Node.js)
- `options` is an optional Object that might contain the following keys:
  - `offset` is an Integer with the byte offset to begin writing at (default: 0)
  - `create` is a Boolean to indicate to create the file if it doesn't exist (default: false)
  - `truncate` is a Boolean to indicate if the file should be truncated after writing all the bytes from `content` (default: false)
  - `parents` is a Boolean value to decide whether or not to make the parent directories if they don't exist (default: false)
  - `length` is an Integer with the maximum number of bytes to read (default: Read all bytes from `content`)
  - `rawLeaves`: if true, DAG leaves will contain raw file data and not be wrapped in a protobuf (boolean, default false)
  - `cidVersion`: the CID version to use when storing the data (storage keys are based on the CID, including its version) (integer, default 0)
  - `mode`: optional UnixFS mode to create or update the file with - a number or a string that will be interpreted as a base 8 number
  - `mtime`: A Date object, an object with `{ sec, nsecs }` properties or the output of `process.hrtime()` or `process.hrtime.bigint()`
**Returns**
**Example:**
#### `files.mv`
> Move files.
##### `ipfs.files.mv(...from, to, [options])`
Where:
- `from` is the path(s) of the source to move
- `to` is the path of the destination to move to
- `options` is an optional Object that might contain the following keys:
  - `parents` is a Boolean value to decide whether or not to make the parent directories if they don't exist (default: false)
  - `hashAlg` is which algorithm to use when creating CIDs for newly created directories (default: `sha2-256`) [The list of all possible values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343)
  - `flush` is a Boolean value to decide whether or not to immediately flush MFS changes to disk (default: true)
If `from` has multiple values then `to` must be a directory.
If `from` has a single value and `to` exists and is a directory, `from` will be moved into `to`.
If `from` has a single value and `to` exists and is a file, `from` must be a file and the contents of `to` will be replaced with the contents of `from` otherwise an error will be returned.

If `from` is an IPFS path, and an MFS path exists with the same name, the IPFS path will be chosen.

If `from` is an IPFS path and the content does not exist in your node's repo, only the root node of the source file with be retrieved from the network and linked to from the destination. The remainder of the file will be retrieved on demand.

All values of `from` will be removed after the operation is complete unless they are an IPFS path.

**Returns**
**Example:**
#### `files.flush`
##### `ipfs.files.flush([path])`
Where:
- `path` is an optional string path to flush (default: `/`)
**Returns**
**Example:**
#### `files.ls`
> List directories in the local mutable namespace.
##### `ipfs.files.ls([path], [options])`
Where:
- `path` is an optional string to show listing for (default: `/`). It might be:
  - An existing MFS path to a directory (e.g. `/my-dir`)
  - An IPFS path (e.g. `/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks`)
  - A [CID][cid] instance (e.g. `new CID('QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks')`)
- `options` is an optional Object that might contain the following keys:
  - `sort` is a Boolean value. If true entries will be sorted by filename (default: false)
**Returns**
**Example:**